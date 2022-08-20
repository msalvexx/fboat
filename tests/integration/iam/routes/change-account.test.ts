import { MySQLAccount } from '@/iam/infra/repositories/entities'
import { MySQLConnectionManager } from '@/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import supertest from 'supertest'
import { StartedMySqlContainer } from 'testcontainers'

describe('PUT /account/:id', () => {
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

  test('Should change account', async () => {
    const accountId = '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85'

    const { status } = await supertest(serverInstance.server)
      .put(`/account/${accountId}`)
      .set('Authorization', token)
      .send({
        personalData: {
          firstName: 'Paulo',
          lastName: 'Passos Menezes',
          occupation: 'Engenheiro Elétrico',
          birthDate: '1988-12-23'
        },
        isActive: true,
        roles: ['FBoatController']
      })

    expect(status).toBe(200)

    const account = await connectionManager.getRepository(MySQLAccount).findOne({ where: { accountId } })
    expect(account?.firstName).toBe('Paulo')
    expect(account?.birthDate).toStrictEqual(new Date('1988-12-23'))
  })
})
