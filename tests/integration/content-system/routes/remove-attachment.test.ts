import { MySQLConnectionManager } from '@/shared/infra'
import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import { resolve } from 'path'
import supertest from 'supertest'
import fs from 'fs'
import { EnvConfig } from '@/main/configs'

describe('DELETE /attachment/{fileName}', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should return 200', async () => {
    const uuid: string = '68292c6c-9635-4151-a994-11b09cab83e8'
    fs.writeFileSync(resolve(EnvConfig.getInstance().configs.staticFile.root, `${uuid}.txt`), Buffer.from('any'))

    const { status } = await supertest(serverInstance.server)
      .delete(`/attachment/${uuid}`)
      .set('Authorization', token)

    expect(status).toBe(200)
  })
})
