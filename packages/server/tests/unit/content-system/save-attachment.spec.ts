import { AttachmentService } from '@/server/content-system/services'

import fs from 'fs'
import { resolve } from 'path'
import rimraf from 'rimraf'

describe('Save Attachment', () => {
  let storageFolder: string
  let sut: AttachmentService

  beforeEach(() => {
    storageFolder = resolve('./files')
    sut = new AttachmentService(storageFolder, 'localhost/public')
  })

  afterAll(() => {
    if (fs.existsSync(storageFolder)) rimraf.sync(storageFolder)
  })

  test('Should return url path where the file was storage', async () => {
    const result = await sut.save({ file: Buffer.from('any'), extension: 'png' })

    expect(result).toEqual({
      url: expect.stringMatching(/^localhost\/public\/.*\.png/),
      fileName: expect.stringMatching(/^.*/)
    })
  })
})
