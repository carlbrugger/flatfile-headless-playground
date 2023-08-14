import api from '@flatfile/api'
import type { FlatfileListener } from '@flatfile/listener'

import { XMLExtractor } from '@flatfile/plugin-xml-extractor'
import { PSVExtractor } from '@flatfile/plugin-psv-extractor'
import { JSONExtractor } from '@flatfile/plugin-json-extractor'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'
import { ZipExtractor } from '@flatfile/plugin-zip-extractor'
import { TSVExtractor } from '@flatfile/plugin-tsv-extractor'
import { DelimiterExtractor } from '@flatfile/plugin-delimiter-extractor'

export default async function (listener: FlatfileListener) {
  listener.use(JSONExtractor())
  listener.use(ExcelExtractor())
  listener.use(XMLExtractor())
  listener.use(PSVExtractor())
  // listener.use(DelimiterExtractor('psv', { delimiter: '|' }))
  listener.use(TSVExtractor())
  // listener.use(DelimiterExtractor('tsv', { delimiter: '\t' }))
  listener.use(DelimiterExtractor('txt', { delimiter: '~' }))
  listener.use(DelimiterExtractor('semicolin', { delimiter: ';' }))
  listener.use(ZipExtractor())

  listener.filter({ job: 'space:configure' }, (configure) => {
    configure.on(
      'job:ready',
      async ({ context: { spaceId, environmentId, jobId } }) => {
        await api.jobs.ack(jobId, {
          info: 'Getting started.',
          progress: 10,
        })

        await api.workbooks.create({
          spaceId,
          environmentId,
          name: 'All Data',
          labels: ['pinned'],
          sheets: [
            {
              name: 'Contacts',
              slug: 'contacts',
              fields: [
                {
                  key: 'firstName',
                  type: 'string',
                  label: 'First Name',
                },
                {
                  key: 'lastName',
                  type: 'string',
                  label: 'Last Name',
                },
                {
                  key: 'email',
                  type: 'string',
                  label: 'Primary Email',
                },
                {
                  key: 'email2',
                  type: 'string',
                  label: 'Secondary Email',
                },
              ],
            },
          ],
        })

        await api.jobs.complete(jobId, {
          outcome: {
            message: 'This job is now complete.',
          },
        })
      }
    )
  })
}
