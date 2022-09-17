import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('DELETE /article/{idOrSlug}', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should return 204', async () => {
    const validUuid = 'artigo-1'

    await supertest(serverInstance.server)
      .delete(`/article/${validUuid}`)
      .set('Authorization', token)
      .expect(204)
  })
})
