import type { FlatfileListener } from '@flatfile/listener'
import { configureSpace } from '@flatfile/plugin-space-configure'
import { webhookEgress } from '@flatfile/plugin-webhook-egress'

export default function (listener: FlatfileListener) {
  listener.use(
    webhookEgress(
      'workbook:submitActionFg',
      'http://localhost:5678/reject-non-flatfile-emails'
    )
  )

  listener.namespace(
    ['space:getting-started'],
    configureSpace({
      workbooks: [
        {
          name: 'Playground',
          sheets: [
            {
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
                },
                {
                  key: 'email',
                  type: 'string',
                  label: 'Email',
                },
              ],
            },
          ],
          // settings: {
          //   trackChanges: true,
          // },
          actions: [
            {
              operation: 'submitActionFg',
              mode: 'foreground',
              label: 'Submit data',
              type: 'string',
              description: 'Submit this data to a webhook.',
              primary: true,
            },
            {
              operation: 'downloadWorkbook',
              mode: 'foreground',
              label: 'Download Workbook',
              description: 'Downloads Excel Workbook of Data',
            },
          ],
        },
      ],
    })
  )
}
