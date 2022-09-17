import { MySQLConnectionManager } from '@/server/shared/infra'

import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('GET /account', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should returns 200 if account exists', async () => {
    const { status, body } = await supertest(serverInstance.server)
      .get(`/account`)
      .set('Authorization', token)
      .query({ pageSize: 5 })

    expect(status).toBe(200)
    expect(body.items.length).toBe(2)
    expect(body.page.size).toBe(5)
  })
})
