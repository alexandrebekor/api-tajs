import { createHash, randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'

export default class Service {
  #filename

  constructor({ filename }) {
    this.#filename = filename
  }

  #hashPassword(password) {
    const hash = createHash('sha256')
    hash.update(password)

    return hash.digest('hex')
  }

  async write({ username, password }) {
    const user = {
      id: randomUUID(),
      username,
      password: this.#hashPassword(password),
      createdAt: new Date().toISOString()
    }

    const data = JSON.stringify(user).concat('\n')
    return fs.appendFile(this.#filename, data)
  }

  async read() {
    const data = await fs.readFile(this.#filename, 'utf-8')
    return data.split('\n')
      .filter(Boolean)
      .map(JSON.parse)
      .map(({ password, ...user }) => user)
  }
}