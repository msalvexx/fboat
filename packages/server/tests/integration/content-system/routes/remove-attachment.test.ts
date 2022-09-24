import { MySQLConnectionManager } from '@/server/shared/infra'
import { EnvConfig } from '@/server/main/configs'

import { refreshDatabase, startTestServer, stopTestServer, createTestToken } from '@/tests/integration/configs/helpers.integration'

import { FastifyInstance } from 'fastify'
import { resolve } from 'path'
import supertest from 'supertest'
import fs from 'fs'
import rimraf from 'rimraf'

describe('DELETE /attachment/{fileName}', () => {
  let serverInstance: FastifyInstance
  let connectionManager: MySQLConnectionManager
  let token: string
  const staticFileDirectory = EnvConfig.getInstance().configs.staticFile.root

  beforeAll(async () => {
    ({ serverInstance, connectionManager } = await startTestServer())
    token = createTestToken()
    if (!fs.existsSync(staticFileDirectory)) fs.mkdirSync(staticFileDirectory)
  })

  beforeEach(async () => await refreshDatabase(connectionManager))

  afterAll(async () => {
    await stopTestServer({ serverInstance })
    if (fs.existsSync(staticFileDirectory)) rimraf.sync(staticFileDirectory)
  })

  test('Should return 204', async () => {
    const uuid = '68292c6c-9635-4151-a994-11b09cab83e8'
    fs.writeFileSync(resolve(staticFileDirectory, `${uuid}.txt`), Buffer.from('any'))

    await supertest(serverInstance.server)
      .delete(`/attachment/${uuid}`)
      .set('Authorization', token)
      .expect(204)
  })
})
