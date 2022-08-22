import { ResourceNotFoundError } from '@/iam'
import { MySQLConnectionManager } from '@/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('GET /article/:id', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should returns 404 if article not exists', async () => {
    const invalidUid = 'invalid-slug'

    const { status, body } = await supertest(serverInstance.server)
      .get(`/article/${invalidUid}`)
      .set('Authorization', token)

    expect(status).toBe(404)
    expect(body.message).toBe(new ResourceNotFoundError().message)
  })
})
