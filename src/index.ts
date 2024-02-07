import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'

export default async function (listener: FlatfileListener) {
  listener.on('**', (event: FlatfileEvent) => {
    console.log(event.target)
  })

  // Plugin example:
  // listener.use(
  //   bulkRecordHook(
  //     'oneHundred',
  //     async (records: FlatfileRecord[]) => {
  //       for (const record of records) {
  //         const email = record.get('email') as string
  //         const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //         if (!validEmailAddress.test(email)) {
  //           record.addError('email', 'Error: Invalid email address')
  //         }
  //       }
  //       return records
  //     },
  //     { debug: true }
  //   )
  // )

  // Namespace example:
  // listener.namespace(
  //   ['space:getting-started'],
  //   configureSpace(
  //     {
  //       workbooks: [
  //         {
  //           name: 'Getting Started',
  //           sheets: [contactsSheet, fieldTypesSheet],
  //           // settings: {
  //           //   trackChanges: true,
  //           // },
  //           actions: [
  //             {
  //               operation: 'submitActionFg',
  //               mode: 'foreground',
  //               label: 'Submit data',
  //               type: 'string',
  //               description: 'Submit this data to a webhook.',
  //               primary: true,
  //             },
  //             {
  //               operation: 'downloadWorkbook',
  //               mode: 'foreground',
  //               label: 'Download Workbook',
  //               description: 'Downloads Excel Workbook of Data',
  //             },
  //           ],
  //         },
  //       ],
  //       space: {
  //         metadata: {
  //           theme: {
  //             root: {
  //               primaryColor: 'black',
  //             },
  //             sidebar: {
  //               logo: 'https://images.ctfassets.net/hjneo4qi4goj/33l3kWmPd9vgl1WH3m9Jsq/13861635730a1b8af383a8be8932f1d6/flatfile-black.svg',
  //             },
  //           },
  //         },
  //       },
  //       documents: [
  //         {
  //           title: 'Welcome',
  //           body: `<div>
  //           <h1 style="margin-bottom: 36px;">Welcome!</h1>
  //           <h2 style="margin-top: 0px; margin-bottom: 12px;">To get started, follow these steps:</h2>
  //           <h2 style="margin-bottom: 0px;">1. Step One</h2>
  //           <p style="margin-top: 0px; margin-bottom: 8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
  //           <h2 style="margin-bottom: 0px;">2. Step Two</h2>
  //           <p style="margin-top: 0px; margin-bottom: 8px;">Consectetur libero id faucibus nisl tincidunt eget. Pellentesque elit eget gravida cum sociis natoque penatibus et. Tempor orci eu lobortis elementum nibh.</p>
  //           </div>`,
  //         },
  //       ],
  //     },
  //     async (event, workbookIds, tick) => {
  //       const { spaceId } = event.context
  //       console.log('Space configured', { spaceId, workbookIds })
  //     }
  //   )
  // )
}
