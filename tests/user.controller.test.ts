import "reflect-metadata"
import { Request, Response } from 'express'
import { beforeEach, afterEach, describe, expect, test, jest } from '@jest/globals'
import { UserController } from '../controllers/user'
import { UserService } from '../services/user'
import container from "../di"

describe('UserController', () => {
  // https://github.com/inversify/InversifyJS/blob/master/wiki/container_snapshots.md
  beforeEach(() => {
    // create a snapshot so each unit test can modify 
    // it without breaking other unit tests
    container.snapshot()
  })

  afterEach(() => {
    // Restore to last snapshot so each unit test 
    // takes a clean copy of the application container
    container.restore()
  })

  test('should return users', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      json: jest.fn() as any
    } as Response

    const controller = container.get<UserController>(UserController)

    await controller.getUsers(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalled()
  })

  test('should return users list', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      json: (data: any) => data
    } as Response

    const controller = container.get<UserController>(UserController)

    const response = await controller.getUsers(mockRequest, mockResponse)

    expect(response).toEqual([
      {"email": "john@example.com", "id": 1, "name": "John Doe"},
      {"email": "jane@example.com", "id": 2, "name": "Jane Smith"}])
  })

  test('bind to different UserService', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      json: (data: any) => data
    } as Response

    const userServiceMock = {
      getUsers: jest.fn().mockReturnValue([
        {"email": "carlos@example.com", "id": 1, "name": "Carlos Doe"},
        {"email": "rita@example.com", "id": 2, "name": "Rita Smith"}])
    } as UserService

    container.unbind(UserService)
    container.bind<UserService>(UserService).toConstantValue(userServiceMock)
    const controller = container.get<UserController>(UserController)

    const response = await controller.getUsers(mockRequest, mockResponse)

    expect(response).toEqual([
      {"email": "carlos@example.com", "id": 1, "name": "Carlos Doe"},
      {"email": "rita@example.com", "id": 2, "name": "Rita Smith"}])
  })
})
