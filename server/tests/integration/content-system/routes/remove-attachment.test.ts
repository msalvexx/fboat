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
  const staticFileDirectory = EnvConfig.getInstance().configs.staticFile.root

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
  })
  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await stopTestServer({ serverInstance }))

  test('Should return 204', async () => {
    const uuid: string = '68292c6c-9635-4151-a994-11b09cab83e8'
    fs.writeFileSync(resolve(staticFileDirectory, `${uuid}.txt`), Buffer.from('any'))

    await supertest(serverInstance.server)
      .delete(`/attachment/${uuid}`)
      .set('Authorization', token)
      .expect(204)
  })
})
