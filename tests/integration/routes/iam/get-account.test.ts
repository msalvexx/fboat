import { AccountNotFoundError } from '@/iam'
import { MySQLConnectionManager } from '@/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'
import { StartedMySqlContainer } from 'testcontainers'

describe('/GET account/:id', () => {
  let serverInstance: FastifyInstance
  let container: StartedMySqlContainer
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ container, serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ container, serverInstance }))

  test('Should returns 404 if account not exists', async () => {
    const invalidUid = '9c7eaaf2-887b-4750-840a-2908aaf01349'

    const { status, body } = await supertest(serverInstance.server)
      .get(`/account/${invalidUid}`)
      .set('Authorization', token)

    expect(status).toBe(404)
    expect(body.message).toBe(new AccountNotFoundError(invalidUid).message)
  })
})
