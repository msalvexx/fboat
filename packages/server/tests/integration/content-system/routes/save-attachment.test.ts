import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('POST /attachment', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should return 201', async () => {
    const { status, body } = await supertest(serverInstance.server)
      .post(`/attachment`)
      .set('Authorization', token)
      .attach('file', Buffer.from('any_buffer'), { filename: 'any_name', contentType: 'image/png' })

    expect(status).toBe(201)
    expect(body.url).toBeDefined()
  })
})
