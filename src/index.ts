import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { getRecordsRaw } from '@flatfile/util-common'

const RECORD_PAGE_SIZE = 5_000
const url = 'https://webhook.site/a5785fb5-ce40-4170-ab13-42e4018ea7f8'

export default function (listener: FlatfileListener) {
  listener.on(
    'job:ready',
    { job: 'workbook:submitActionFg', isPart: false },
    async (event: FlatfileEvent) => {
      const { jobId, workbookId } = event.context

      await api.jobs.ack(jobId, {
        info: `Splitting Job`,
        progress: 10,
      })

      const { data: workbook } = await api.workbooks.get(workbookId)

      const partsPromises = workbook.sheets.map(async (sheet) => {
        const {
          data: {
            counts: { total },
          },
        } = await api.sheets.getRecordCounts(sheet.id)

        const numberOfPages = Math.ceil(total / RECORD_PAGE_SIZE)

        // Return an array of parts for this sheet
        return Array.from({ length: numberOfPages }, (_, index) => ({
          sheetId: sheet.id,
          pageNumber: index + 1,
          pageSize: RECORD_PAGE_SIZE,
        }))
      })

      const parts = (await Promise.all(partsPromises)).flat()
      await api.jobs.split(jobId, { parts, runInParallel: true })

      await api.jobs.ack(jobId, {
        info: `Job Split into ${parts.length} parts.`,
        progress: 20,
      })
    }
  )

  listener.on(
    'job:ready',
    { job: 'workbook:submitActionFg', isPart: true },
    async (event: FlatfileEvent) => {
      const { jobId, workbookId } = event.context
      const { data: workbook } = await api.workbooks.get(workbookId)

      const job = await api.jobs.get(jobId)
      const { sheetId, pageNumber } = job.data.partData

      const { data: sheet } = await api.sheets.get(sheetId)

      const records = await getRecordsRaw(sheetId, {
        pageNumber,
        pageSize: RECORD_PAGE_SIZE,
        filter: 'valid',
      })

      const sheetExport = {
        ...sheet,
        records,
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workbook: {
              ...workbook,
              sheets: [sheetExport],
            },
          }),
        })

        if (response.status === 200) {
          await api.jobs.complete(jobId, {
            outcome: {
              message: `Data was successfully submitted to ${url}.`,
            },
          })
          return
        } else {
          await api.jobs.fail(jobId, {
            outcome: {
              message: `Data was not successfully submitted to the provided webhook. Status: ${response.status} ${response.statusText}`,
            },
          })
          return
        }
      } catch (error) {
        await api.jobs.fail(jobId, {
          outcome: { message: `Error posting data to webhook` },
        })
        return
      }
    }
  )

  listener.on(
    'job:parts-completed',
    { job: 'workbook:submitActionFg', isPart: false },
    async (event: FlatfileEvent) => {
      const { jobId } = event.context

      await api.jobs.complete(jobId, {
        outcome: {
          message: 'This job is now complete.',
        },
      })
    }
  )
}
