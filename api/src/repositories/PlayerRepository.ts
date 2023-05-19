import type { PathLike } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

export type Player = {
  id: string
  name: string
  position: string
  age: number
}

export type FindProps = Player['id']

export type CreateProps = Omit<Player, 'id'>

export class PlayerRepository {
  filePath: PathLike

  constructor({ filePath }) {
    this.filePath = filePath
  }

  private async currentFileContent() {
    const fileContent = await readFile(this.filePath, 'utf8')
    const players = JSON.parse(fileContent) as Player[]

    return players
  }

  async find(playerID?: FindProps) {
    const all = await this.currentFileContent()

    if (!playerID) {
      return all
    }

    return all.find(({ id }) => playerID === id)
  }

  async create({ age, name, position }: CreateProps) {
    const id = randomUUID()
    const currentFile = await this.currentFileContent()

    currentFile.push({ id, age, name, position })

    const currentFileStringified = JSON.stringify(currentFile)

    await writeFile(this.filePath, currentFileStringified, 'utf8')

    return id
  }
}
