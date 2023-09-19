import { Flatfile } from '@flatfile/api'

export const xLargeExcelSheet: Flatfile.SheetConfig = {
  name: 'xLarge Excel',
  slug: 'xlarge-excel',
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
