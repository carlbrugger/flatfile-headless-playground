import api from '@flatfile/api'
import { FlatfileListener } from '@flatfile/listener'
import { configureSpace } from '@flatfile/plugin-space-configure'
import { contactsSheet } from './blueprints'

const RECORD_PAGE_SIZE = 10_000

export default function (listener: FlatfileListener) {
  listener.on(
    'job:ready',
    { job: 'sheet:submitLargeSheet', isPart: false },
    async (event) => {
      const { jobId, sheetId } = event.context
      console.log('job:ready [PARENT]', { jobId })

      await api.jobs.ack(jobId, {
        info: `Splitting Job`,
        progress: 10,
      })

      const { data: counts } = await api.sheets.getRecordCounts(sheetId)
      const { total } = counts.counts
      const parts = Math.ceil(total / RECORD_PAGE_SIZE)
      console.log('splitting job: ', { jobId, parts })

      const splitjob = await api.jobs.split(jobId, { parts })
      console.log('splitjob: ', { splitjob })

      await api.jobs.ack(jobId, {
        info: `Job Split into ${parts} parts.`,
        progress: 20,
      })
    }
  )

  listener.on(
    'job:ready',
    { job: 'sheet:submitLargeSheet', isPart: true },
    async (event) => {
      const { jobId } = event.context

      const job = await api.jobs.get(jobId)
      console.dir({ job }, { depth: 10 })

      const { partData, parentId } = job.data
      console.log('submitting part: ', { parentId, jobId, partData })

      const { records } = await event.data({
        pageNumber: partData.part + 1,
      })
      console.log('record count: ', records.length)

      // simulate processing
      await new Promise((r) => setTimeout(r, 500))

      const progress = 20 + ((partData.part + 1) / partData.total) * 80
      console.log('parent job progress:', progress)
      await api.jobs.ack(parentId, {
        info: `Part ${partData.part + 1} / ${partData.total} submitted. `,
        progress,
      })

      await api.jobs.complete(jobId, {
        outcome: {
          message: 'This part job is now complete.',
        },
      })
    }
  )

  listener.on(
    'job:parts-completed',
    { job: 'sheet:submitLargeSheet', isPart: false },
    async (event) => {
      const { jobId } = event.context

      console.log('job:parts-completed: ', jobId)

      await api.jobs.complete(jobId, {
        outcome: {
          message: 'This job is now complete.',
        },
      })
    }
  )

  listener.use(
    configureSpace({
      workbooks: [
        {
          name: 'Contacts',
          sheets: [contactsSheet],
          actions: [
            {
              operation: 'submitActionFg',
              mode: 'foreground',
              label: 'Submit data',
              type: 'string',
              description: 'Submit this data to a webhook.',
              primary: true,
            },
          ],
        },
      ],
    })
  )
}
