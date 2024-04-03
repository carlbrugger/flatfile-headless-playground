import type { Flatfile } from '@flatfile/api'
import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import type { RejectionResponse } from '@flatfile/util-response-rejection'
import { responseRejectionHandler } from '@flatfile/util-response-rejection'

export default function (listener: FlatfileListener) {
  listener.on(
    'job:ready',
    { job: 'workbook:submitActionFg' },
    async (event: FlatfileEvent) => {
      const { jobId } = event.context

      await api.jobs.ack(jobId, {
        info: 'Accepted',
        progress: 1,
      })

      // Default outcome for successful submission
      let outcome: Flatfile.JobCompleteDetails = {
        outcome: {
          message: `Data was successfully submitted with no rejections.`,
        },
      }

      try {
        const data = [] // TODO: implement your own logic here for retrieving the records and formatting them for the webhook
        const response = await fetch('https://webhook.site/...', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()

        const rejections: RejectionResponse = responseData.rejections
        if (rejections) {
          // Update outcome for rejections
          outcome = await responseRejectionHandler(rejections)
        }

        await api.jobs.complete(
          jobId,
          outcome ?? {
            outcome: {
              message: 'Job complete',
            },
          }
        )
      } catch (error) {
        await api.jobs.fail(
          jobId,
          outcome ?? {
            info: String(error.message),
            outcome: {
              acknowledge: true,
              message: String(error.message),
            },
          }
        )
      }
    }
  )
}
