import { SaveAttachment } from "@/content-system/domain"
import { StorageFileError } from "@/shared/domain/model"
import { newUuid } from "@/shared/infra/gateways"

import fs from 'fs'

export class AttachmentService implements SaveAttachment {
  constructor (private readonly contentPath: string, private readonly urlPrefixPath: string) {}
  async save (params: SaveAttachment.Params): Promise<string> {
    const fileName = `${newUuid()}.${params.extension}`
    try {
      if (!fs.existsSync(this.contentPath)) fs.mkdirSync(this.contentPath)
      fs.writeFileSync(`${this.contentPath}/${fileName}`, params.file)
    } catch (e) {
      console.log(e)
      throw new StorageFileError()
    }
    return `${this.urlPrefixPath}/${fileName}`
  }
}
