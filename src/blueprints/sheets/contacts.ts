import { Flatfile } from '@flatfile/api'

export const contactsSheet: Flatfile.SheetConfig = {
  name: 'Contacts',
  slug: 'contacts',
  allowAdditionalFields: true,
  fields: [
    {
      key: 'firstName',
      type: 'string',
      label: 'First Name',
      constraints: [{ type: 'required' }, { type: 'unique' }],
    },
    {
      key: 'lastName',
      type: 'string',
      label: 'Last Name',
      // constraints: [
      //   { type: 'external', validator: 'length', config: { max: 10 } },
      // ],
    },
    {
      key: 'email',
      type: 'string',
      label: 'Email',
      // constraints: [
      //   {
      //     type: 'external',
      //     validator: 'email',
      //     config: { emailRegex: '^[^s@]+@[^s@]+.[^s@]+$' },
      //   },
      // ],
    },
    {
      key: 'dob',
      type: 'date',
      label: 'DOB',
    },
    {
      key: 'age',
      type: 'number',
      label: 'Age',
    },
  ],
  actions: [
    {
      operation: 'duplicateSheet',
      mode: 'foreground',
      label: 'Duplicate',
      description: 'Duplicate this sheet.',
      primary: true,
    },
    {
      operation: 'dedupeEmail',
      mode: 'background',
      label: 'Dedupe emails',
      description: 'Remove duplicate emails',
    },
  ],
}
