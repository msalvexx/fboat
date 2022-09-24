import { AttachmentService } from '@/server/content-system/services'

import fs from 'fs'
import { resolve } from 'path'
import rimraf from 'rimraf'

describe('Remove Attachment', () => {
  let storageFolder: string
  let sut: AttachmentService

  beforeAll(() => {
    storageFolder = resolve('./files')
    if (!fs.existsSync(storageFolder)) fs.mkdirSync(storageFolder)
  })

  beforeEach(() => {
    sut = new AttachmentService(storageFolder, 'localhost/public')
  })

  afterAll(() => {
    if (fs.existsSync(storageFolder)) rimraf.sync(storageFolder)
  })

  test('Should return url path where the file was storage', async () => {
    const fileToRemove = 'any-file'
    fs.writeFileSync(resolve(storageFolder, `${fileToRemove}.txt`), Buffer.from('any'))

    await sut.remove({ fileName: fileToRemove })

    expect(fs.existsSync(resolve(storageFolder, fileToRemove))).toBeFalsy()
  })
})
