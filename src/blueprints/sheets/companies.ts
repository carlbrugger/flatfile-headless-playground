import { Flatfile } from '@flatfile/api'

export const companiesSheet: Flatfile.SheetConfig = {
  name: 'Companies',
  slug: 'companies',
  fields: [
    {
      key: 'name',
      type: 'string',
      label: 'Name',
    },
    {
      key: 'website',
      type: 'string',
      label: 'Website',
    },
    //...
  ],
}
