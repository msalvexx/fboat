import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('PUT /account/:id/password', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should change password correctly', async () => {
    const accountId = '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85'

    const { status } = await supertest(serverInstance.server)
      .put(`/account/${accountId}/password`)
      .set('Authorization', token)
      .send({
        newPassword: 'newpassword'
      })

    expect(status).toBe(204)
  })
})
