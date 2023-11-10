import api from '@flatfile/api'
import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { JSONExtractor } from '@flatfile/plugin-json-extractor'
import { configureSpace } from '@flatfile/plugin-space-configure'

export default async function (listener: FlatfileListener) {
  listener.use(JSONExtractor())
  listener.on(
    'job:ready',
    { operation: 'extract*' },
    async (event: FlatfileEvent) => {
      const { fileId } = event.context
      const { data: file } = await api.files.get(fileId)
      const { data: workbook } = await api.workbooks.get(file.workbookId)
      const sheetId = workbook.sheets[0].id

      try {
        await api.jobs.create({
          type: 'sheet',
          operation: 'export',
          trigger: 'immediate',
          source: sheetId,
          config: {
            options: {
              filter: 'all',
            },
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
  )
  listener.use(
    configureSpace({
      workbooks: [
        {
          name: 'Workbook',
          sheets: [
            {
              name: 'Sheet',
              slug: 'sheet',
              fields: [
                {
                  key: 'name',
                  type: 'string',
                  label: 'Name',
                },
              ],
            },
          ],
        },
      ],
    })
  )
}
