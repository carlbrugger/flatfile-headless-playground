import type { FlatfileListener } from '@flatfile/listener'

import { ZipExtractor } from '@flatfile/plugin-zip-extractor'

export default async function (listener: FlatfileListener) {
  listener.on('**', (event) => {
    console.log(event.topic)
  })

  listener.use(ZipExtractor())
}
