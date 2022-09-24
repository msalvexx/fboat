import { AccountNotFoundError } from '@fboat/core/iam/models'
import { MySQLConnectionManager } from '@/server/shared/infra'

import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('GET /account/:id', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should returns 404 if account not exists', async () => {
    const invalidUid = '9c7eaaf2-887b-4750-840a-2908aaf01349'

    const { status, body } = await supertest(serverInstance.server)
      .get(`/account/${invalidUid}`)
      .set('Authorization', token)

    expect(status).toBe(404)
    expect(body.message).toBe(new AccountNotFoundError(invalidUid).message)
  })

  test('Should returns 200 if account exists', async () => {
    const validUid = '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85'

    const { status, body } = await supertest(serverInstance.server)
      .get(`/account/${validUid}`)
      .set('Authorization', token)

    expect(status).toBe(200)
    expect(body.accountId).toBe(validUid)
  })
})
