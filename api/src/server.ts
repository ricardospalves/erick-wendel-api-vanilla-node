import type { IncomingMessage, ServerResponse } from 'node:http'
import http from 'node:http'
import { createPlayerInstance } from './factories/playerFactory'
import { Player } from './entities/player'

const playerService = createPlayerInstance()

const PORT = 3000
const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
}

const routes = {
  '/players:get': async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
  ) => {
    const { id } = request.queryString
    // await Promise.reject('/players:get')
    const players = await playerService.find(id)

    response.write(
      JSON.stringify({
        results: players,
      }),
    )
    return response.end()
  },
  '/players:post': async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
  ) => {
    // async iterator
    for await (const data of request) {
      try {
        // await Promise.reject('/players:post')
        const item = JSON.parse(data)
        const player = new Player(item)
        const { error, valid } = player.isValid()

        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER)
          response.write(JSON.stringify({ error: error.join(', ') }))
          return response.end()
        }

        const id = await playerService.create(player)

        response.writeHead(201, DEFAULT_HEADER)
        response.write(
          JSON.stringify({ success: 'User created with success!', id }),
        )

        return response.end()
      } catch (error) {
        return handleError(response)(error)
      }
    }
  },
  default: (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
  ) => {
    response.write('Hello')
    return response.end()
  },
}

const handleError = (response: ServerResponse<IncomingMessage>) => {
  return (error) => {
    console.log('Deu ruim', error)

    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal server error.' }))

    return response.end()
  }
}

const handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => {
  const { url, method } = request
  const [root, route, id] = url.split('/')

  request.queryString = {
    id,
  }

  const key = `/${route}:${method.toLowerCase()}`

  response.writeHead(200, DEFAULT_HEADER)

  const chosen = routes[key] || routes.default

  return chosen(request, response).catch(handleError(response))
}

http.createServer(handler).listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})
