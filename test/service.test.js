import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import fs from 'fs/promises'
import Service from '../src/service.js'
import crypto from 'node:crypto'

describe('# Service', () => {
  let _service
  const filename = 'test.ndjson'
  const MOCKED_HASH_PASSWORD = 'hashed_password'

  beforeEach(() => {
    jest.spyOn(
      crypto,
      crypto.createHash.name
    ).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(MOCKED_HASH_PASSWORD)
    })

    jest.spyOn(
      fs,
      fs.writeFile.name
    ).mockResolvedValue()

    _service = new Service({
      filename
    })
  })

  describe('# read', () => {
    it('should return an empty array if the file does not exist', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue('')

      const result = await _service.read()
      expect(result).toEqual([])
    })

    it('should return an array of users without password field', async () => {
      const user = {
          id: '1',
          username: 'test',
          createdAt: new Date().toISOString()
        }

      jest.spyOn(
        fs,
        "readFile"
      ).mockResolvedValue(JSON.stringify(user))

      const result = await _service.read()
      expect(result).toEqual([user])
    })
  })
})