import { MySQLConnectionManager } from '@/server/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

describe('POST /account', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

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

    expect(status).toBe(201)
    expect(body.user.email).toBe(email)
  })
})
