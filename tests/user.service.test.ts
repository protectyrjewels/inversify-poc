import "reflect-metadata"
import { describe, expect, test } from '@jest/globals'
import { UserService } from '../services/user'

describe('UserService', () => {
  test('should be defined', () => {
    expect(UserService).toBeDefined()
  })

  test('should return users', () => {
    const users = new UserService().getUsers()
    expect(users.length).toBe(2)
  })
})
