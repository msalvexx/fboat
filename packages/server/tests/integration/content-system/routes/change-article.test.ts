import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('PUT /article', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should change an article', async () => {
    const validSlug = 'artigo-1'
    const { status, body } = await supertest(serverInstance.server)
      .put(`/article/${validSlug}`)
      .set('Authorization', token)
      .send({
        authorId: 'c77f7d99-c956-4dd2-a63f-b7a1ca6f28aa',
        title: 'An amazing article',
        content: '<html></html>',
        summary: 'bla bla',
        coverPhoto: 'any-photo',
        slug: 'new-slug'
      })

    expect(status).toBe(200)
    expect(body.slug).toBe('new-slug')
  })
})
