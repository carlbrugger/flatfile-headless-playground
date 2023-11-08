import type { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { FlatfileRecord, recordHook } from '@flatfile/plugin-record-hook'

export default async function (listener: FlatfileListener) {
  listener.use(
    recordHook('contacts', (r: FlatfileRecord, event: FlatfileEvent) => {
      const email = r.get('email') as string
      if (!email) {
        console.log('Email is required')
        r.addError('email', 'Email is required')
      }

      const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (email !== null && !validEmailAddress.test(email)) {
        console.log('Invalid email address')
        r.addError('email', 'Invalid email address')
      }

      return r
    })
  )
}
