import { join } from 'node:path'
import { PlayerRepository } from '../repositories/PlayerRepository'
import { PlayerService } from '../services/PlayerService'

const filePath = join(__dirname, '../../database', 'players.json')

export const createPlayerInstance = () => {
  const playerRepository = new PlayerRepository({ filePath })
  const playerService = new PlayerService({
    playerRepository,
  })

  return playerService
}
