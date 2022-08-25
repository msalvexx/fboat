import { RemoveAttachment, SaveAttachment } from "@/content-system/domain"
import { StorageFileError } from "@/shared/domain/model"
import { newUuid } from "@/shared/infra/gateways"

import { resolve } from 'path'
import fs from 'fs'

export class AttachmentService implements SaveAttachment, RemoveAttachment {
  constructor (
    private readonly contentPath: string,
    private readonly urlPrefixPath: string
  ) {}

  async save (params: SaveAttachment.Params): Promise<SaveAttachment.Result> {
    const fileName = `${newUuid()}.${params.extension}`
    try {
      if (!fs.existsSync(this.contentPath)) fs.mkdirSync(this.contentPath)
      fs.writeFileSync(resolve(this.contentPath, fileName), params.file)
    } catch (e) {
      console.log(e)
      throw new StorageFileError()
    }
    return {
      url: `${this.urlPrefixPath}/${fileName}`,
      fileName
    }
  }

  async remove (fileName: string): Promise<void> {
    try {
      const file = resolve(this.contentPath, fileName)
      if (fs.existsSync(file)) fs.rmSync(file)
    } catch (e) {
      console.log(e)
      throw new StorageFileError()
    }
  }
}
