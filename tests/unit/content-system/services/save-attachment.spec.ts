import { AttachmentService } from '@/content-system/services'
import { StorageFileError } from '@/shared/domain/model'

import fs from 'fs'
import { resolve } from 'path'
import rimraf from 'rimraf'

jest.mock('fs')

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

  test('Should throw PersistDataChangeError', async () => {
    // @ts-expect-error:next-line
    fs.writeFileSync.mockImplementationOnce(() => { throw new Error() })

    const promise = sut.save({ file: Buffer.from('any'), extension: 'png' })

    await expect(promise).rejects.toThrow(new StorageFileError())
  })

  test('Should return url path where the file was storage', async () => {
    const result = await sut.save({ file: Buffer.from('any'), extension: 'png' })

    expect(result).toEqual({
      url: expect.stringMatching(/^localhost\/public\/.*\.png/),
      fileName: expect.stringMatching(/^.*\.png/)
    })
  })
})
