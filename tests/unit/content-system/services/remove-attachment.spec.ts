import { AttachmentService } from '@/content-system/services'
import { StorageFileError } from '@/shared/domain/model'

import fs from 'fs'
import { resolve } from 'path'
import rimraf from 'rimraf'

jest.mock('fs')

describe('Remove Attachment', () => {
  let storageFolder: string
  let sut: AttachmentService

  beforeEach(() => {
    storageFolder = resolve('./files')
    sut = new AttachmentService(storageFolder, 'localhost/public')
  })

  afterAll(() => {
    if (fs.existsSync(storageFolder)) rimraf.sync(storageFolder)
  })

  test('Should throw StorageFileError', async () => {
    // @ts-expect-error:next-line
    fs.existsSync.mockImplementationOnce(() => { throw new Error() })

    const promise = sut.remove('any')

    await expect(promise).rejects.toThrow(new StorageFileError())
  })

  test('Should return url path where the file was storage', async () => {
    const fileToRemove: string = 'any-file.txt'
    fs.writeFileSync(resolve(storageFolder, fileToRemove), Buffer.from('any'))

    await sut.remove(fileToRemove)

    expect(fs.existsSync(resolve(storageFolder, fileToRemove))).toBeFalsy()
  })
})
