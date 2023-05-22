import { IncomingMessage } from 'node:http'

declare module 'node:http' {
  interface IncomingMessage {
    queryString: { id?: string }
  }
}
