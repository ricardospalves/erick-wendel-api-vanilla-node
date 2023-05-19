import type { FindProps, CreateProps } from '../repositories/PlayerRepository'
import { PlayerRepository } from '../repositories/PlayerRepository'

type PlayerServiceProps = {
  playerRepository: PlayerRepository
}

export class PlayerService {
  playerRepository: PlayerRepository

  constructor({ playerRepository }: PlayerServiceProps) {
    this.playerRepository = playerRepository
  }

  find(playerId?: FindProps) {
    return this.playerRepository.find(playerId)
  }

  create(player: CreateProps) {
    return this.playerRepository.create(player)
  }
}
