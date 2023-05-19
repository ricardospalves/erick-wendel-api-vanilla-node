import http from 'node:http'

declare module 'node:http' {
  interface IncomingMessage extends http.IncomingMessage {
    queryString: { id?: string }
  }
}
