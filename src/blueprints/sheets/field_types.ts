import type { Flatfile } from '@flatfile/api'

export const fieldTypesSheet: Flatfile.SheetConfig = {
  name: 'Field Types',
  slug: 'field_types',
  fields: [
    {
      key: 'string',
      type: 'string',
      label: 'String',
    },
    {
      key: 'number',
      type: 'number',
      label: 'Number',
    },
    {
      key: 'date',
      type: 'date',
      label: 'Date',
    },
    {
      key: 'boolean',
      type: 'boolean',
      label: 'Boolean',
    },
    {
      key: 'enum',
      type: 'enum',
      label: 'Enum',
      config: {
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ],
      },
    },
    {
      key: 'reference',
      type: 'reference',
      label: 'Reference',
      config: {
        key: 'email',
        ref: 'contacts',
        relationship: 'has-one',
      },
    },
  ],
}
