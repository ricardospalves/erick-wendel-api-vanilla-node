import { randomUUID } from 'node:crypto'

export type PlayerData = {
  id: string
  name: string
  age: number
  position: string
}

type PlayerProps = Omit<PlayerData, 'id'>

export class Player {
  age: number
  name: string
  position: string

  constructor({ age, name, position }: PlayerProps) {
    this.age = age
    this.name = name
    this.position = position
  }

  get id() {
    return randomUUID()
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this)
    const amountInvalid = propertyNames
      .map((property) => {
        return this[property] ? null : `${property} is missing.`
      })
      .filter((property) => Boolean(property))

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    }
  }
}
