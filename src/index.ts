import { Flatfile } from '@flatfile/api'
import type { FlatfileListener } from '@flatfile/listener'
import { configureSpace } from '@flatfile/plugin-space-configure'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'

export default async function (listener: FlatfileListener) {
  listener.use(ExcelExtractor({ chunkSize: 30000, parallel: 3 }))
  listener.use(
    configureSpace({
      workbooks: [
        {
          name: 'Workbook One',
          sheets: [sheet],
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

export const sheet: Flatfile.SheetConfig = {
  name: 'Sheet',
  slug: 'sheet',
  fields: [
    {
      key: 'serial',
      type: 'string',
      label: 'Serial',
    },
    {
      key: 'productName',
      type: 'string',
      label: 'Product Name',
    },
    {
      key: 'office',
      type: 'string',
      label: 'Office',
    },
    {
      key: 'creation',
      type: 'string',
      label: 'Creation',
    },
    {
      key: 'department',
      type: 'string',
      label: 'Department',
    },
    {
      key: 'color',
      type: 'string',
      label: 'Color',
    },
    {
      key: 'size',
      type: 'string',
      label: 'Size',
    },
    {
      key: 'quality',
      type: 'string',
      label: 'Quality',
    },
    {
      key: 'packSize',
      type: 'string',
      label: 'Pack Size',
    },
    {
      key: 'msrpp',
      type: 'string',
      label: 'MSRPP',
    },
    {
      key: 'vat',
      type: 'string',
      label: 'VAT',
    },
  ],
}
