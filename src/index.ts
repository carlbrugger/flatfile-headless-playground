import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { configureSpace } from '@flatfile/plugin-space-configure'
import { processRecords } from '@flatfile/util-common'
import { processRecords as sdkProcessRecords } from '@flatfile/util-common-sdk'
import { oneHundredSheet } from './blueprints'

export default async function (listener: FlatfileListener) {
  listener.on(
    'job:ready',
    { operation: 'processRecords' },
    async (event: FlatfileEvent) => {
      const { jobId, sheetId } = event.context
      try {
        await api.jobs.ack(jobId, { info: 'Processing records' })

        // Time processRecords
        console.time('processRecords')
        await processRecords(
          sheetId,
          async (records, pageNumber, totalPageCount) => {
            console.log(
              `Processing ${records.length} records on page ${pageNumber} of ${totalPageCount}`
            )
            await api.jobs.ack(jobId, {
              info: `Processing ${records.length} records on page ${pageNumber} of ${totalPageCount}`,
              progress: (pageNumber / totalPageCount) * 100,
            })
          }
        )
        console.timeEnd('processRecords')

        await api.jobs.complete(jobId, { info: 'Completed processing records' })
      } catch (e) {
        console.error(e)
        await api.jobs.fail(jobId, { info: 'Failed processing records' })
      }
    }
  )

  listener.on(
    'job:ready',
    { operation: 'sdkProcessRecords' },
    async (event: FlatfileEvent) => {
      const { jobId, sheetId } = event.context
      try {
        await api.jobs.ack(jobId, { info: 'Processing records' })

        // This is done in the fetch version of the processRecords function and is passed to the callback
        const {
          data: { counts },
        } = await api.sheets.getRecordCounts(sheetId)
        const pageSize = 10_000
        const totalPageCount = Math.ceil(counts.total / pageSize) || 1

        // Time processRecords
        console.time('processRecords')
        await sdkProcessRecords(sheetId, async (records, pageNumber) => {
          console.log(
            `Processing ${records.length} records on page ${pageNumber} of ${totalPageCount}`
          )
          await api.jobs.ack(jobId, {
            info: `Processing ${records.length} records on page ${pageNumber} of ${totalPageCount}`,
            progress: (pageNumber / totalPageCount) * 100,
          })
        })
        console.timeEnd('processRecords')

        await api.jobs.complete(jobId, { info: 'Completed processing records' })
      } catch (e) {
        console.error(e)
        await api.jobs.fail(jobId, { info: 'Failed processing records' })
      }
    }
  )

  listener.use(
    configureSpace({
      workbooks: [
        {
          name: 'One Hundred Workbook',
          sheets: [oneHundredSheet],
        },
      ],
    })
  )
}
