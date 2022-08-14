import { MySQLConnectionManager } from '@/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'
import { StartedMySqlContainer } from 'testcontainers'

describe('GET /account/:id', () => {
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

  test('Should create a new account', async () => {
    const email = 'newaccount@mail.com'
    const { status, body } = await supertest(serverInstance.server)
      .post(`/account`)
      .set('Authorization', token)
      .send({
        email,
        password: 'new@123',
        personalData: {
          firstName: 'Jorge',
          lastName: 'Ferreira Figueiredo',
          occupation: 'Escritor',
          birthDate: '1984-08-13'
        },
        roles: ['FBoatReader']
      })
    expect(status).toBe(200)
    expect(body.user.email).toBe(email)
  })
})
