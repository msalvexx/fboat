import { UnauthorizedError } from '@fboat/core/iam/models'
import { MySQLConnectionManager } from '@/server/shared/infra'

import { refreshDatabase, startTestServer, stopTestServer } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('POST /login', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager

  beforeAll(async () => ({ serverInstance, connectionManager } = await startTestServer()))
  afterAll(async () => await stopTestServer({ serverInstance }))
  beforeEach(async () => await refreshDatabase(connectionManager))

  test('Should return 401 if authentication fail', async () => {
    const { status, body } = await supertest(serverInstance.server)
      .post('/login')
      .send({
        email: 'writer@mail.com',
        password: '123'
      })

    expect(status).toBe(401)
    expect(body.message).toBe(new UnauthorizedError().message)
  })

  test('Should return a valid token if authentication succeed', async () => {
    const { status, body } = await supertest(serverInstance.server)
      .post('/login')
      .send({
        email: 'writer@mail.com',
        password: 'writer@123'
      })

    expect(status).toBe(200)
    expect(body.token).toBeDefined()
    expect(body.personName).toBe('Paula Passos Menezes')
  })
})
