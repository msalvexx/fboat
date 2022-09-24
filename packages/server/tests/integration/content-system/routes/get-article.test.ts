import { ResourceNotFoundError } from '@fboat/core/shared/models'
import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('GET /article/:id', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager

  beforeAll(async () => ({ serverInstance, connectionManager } = await startTestServer()))
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should returns 404 if article not exists', async () => {
    const invalidUid = 'invalid-slug'

    const { status, body } = await supertest(serverInstance.server)
      .get(`/article/${invalidUid}`)

    expect(status).toBe(404)
    expect(body.message).toBe(new ResourceNotFoundError().message)
  })

  test('Should returns 200 if article exists', async () => {
    const validSlug = 'artigo-1'

    const { status, body } = await supertest(serverInstance.server)
      .get(`/article/${validSlug}`)

    expect(status).toBe(200)
    expect(body.slug).toBe(validSlug)
  })
})
