import api from '@flatfile/api'
import type { FlatfileListener } from '@flatfile/listener'
import { configureSpace } from '@flatfile/plugin-space-configure'
import { companiesSheet, contactsSheet } from './blueprints'

export default function (listener: FlatfileListener) {
  listener.use(
    configureSpace(
      {
        workbooks: [
          {
            name: 'Workbook 1',
            sheets: [contactsSheet, companiesSheet],
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
                operation: 'duplicateWorkbook',
                mode: 'foreground',
                label: 'Duplicate',
                description: 'Duplicate this workbook.',
              },
            ],
          },
        ],
      },
      async (event, workbookIds, tick) => {
        const { spaceId } = event.context
        await api.documents.create(spaceId, {
          title: 'Welcome',
          body: `<div>
      <h1 style="margin-bottom: 36px;">Welcome!</h1>
      <h2 style="margin-top: 0px; margin-bottom: 12px;">To get started, follow these steps:</h2>
      <h2 style="margin-bottom: 0px;">1. Step One</h2>
      <p style="margin-top: 0px; margin-bottom: 8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <h2 style="margin-bottom: 0px;">2. Step Two</h2>
      <p style="margin-top: 0px; margin-bottom: 8px;">Consectetur libero id faucibus nisl tincidunt eget. Pellentesque elit eget gravida cum sociis natoque penatibus et. Tempor orci eu lobortis elementum nibh.</p>
      <h2 style="margin-bottom: 0px;">3. Step Three</h2>
      <p style="margin-top: 0px; margin-bottom: 12px;">Neque volutpat ac tincidunt vitae semper quis lectus nulla at. Magna etiam tempor orci eu lobortis elementum. Tellus in metus vulputate eu scelerisque felis. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim.</p>
      <h2 style="margin-bottom: 0px;">4. Step Four</h2>
      <p style="margin-top: 0px; margin-bottom: 36px;">Duis ut diam quam nulla porttitor massa id neque aliquam. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Non enim praesent elementum facilisis leo vel.</p>
      <h3 style="margin-top: 0px; margin-bottom: 12px;">Remember, if you need any assistance, you can always refer back to this page by clicking "Welcome" in the left-hand sidebar!</h3>
      </div>`,
        })
        tick(80, 'Document created')
      }
    )
  )
}
