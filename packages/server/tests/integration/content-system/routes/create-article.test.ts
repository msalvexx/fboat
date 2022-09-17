import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('POST /article', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should create a new article', async () => {
    const { status, body } = await supertest(serverInstance.server)
      .post(`/article`)
      .set('Authorization', token)
      .send({
        title: 'An amazing article',
        content: '<html></html>',
        summary: 'bla bla',
        coverPhoto: 'any-photo',
        slug: 'new-slug'
      })

    expect(status).toBe(201)
    expect(body.title).toBe('An amazing article')
  })
})
