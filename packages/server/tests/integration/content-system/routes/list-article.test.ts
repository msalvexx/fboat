import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('GET /article', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager

  beforeAll(async () => ({ serverInstance, connectionManager } = await startTestServer()))
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should returns 200', async () => {
    const { status, body } = await supertest(serverInstance.server)
      .get('/article')
      .query({ isPublished: true })

    expect(status).toBe(200)
    expect(body.items.length).toBe(2)
  })
})
