import { newUuid, StorageFileError, SaveAttachment, RemoveAttachment } from '@fboat/core'

import { resolve } from 'path'
import fs from 'fs'

export class AttachmentService implements SaveAttachment, RemoveAttachment {
  constructor (
    private readonly contentPath: string,
    private readonly urlPrefixPath: string
  ) {}

  async save (params: SaveAttachment.Params): Promise<SaveAttachment.Result> {
    const fileName = newUuid()
    try {
      if (!fs.existsSync(this.contentPath)) fs.mkdirSync(this.contentPath)
      fs.writeFileSync(resolve(this.contentPath, `${fileName}.${params.extension}`), params.file)
    } catch (e) {
      console.log(e)
      throw new StorageFileError()
    }
    return {
      url: `${this.urlPrefixPath}/${fileName}.${params.extension}`,
      fileName
    }
  }

  async remove ({ fileName }: RemoveAttachment.Params): Promise<void> {
    try {
      fs.readdirSync(this.contentPath)
        .filter(x => x.includes(fileName))
        .forEach(file => fs.rmSync(resolve(this.contentPath, file)))
    } catch (e) {
      console.log(e)
      throw new StorageFileError()
    }
  }
}
