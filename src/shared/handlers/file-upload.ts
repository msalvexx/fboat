import { SaveAttachment } from '@/content-system'
import { AbstractHandler } from '@/shared/handlers'

export class FileUploadHandler extends AbstractHandler {
  override async handle (params: any): Promise<any> {
    if (params.file !== undefined) {
      const file: SaveAttachment.Params = {
        file: params.file.data,
        extension: params.file.mimetype.replace(/\w+\//, '')
      }
      params = file
    }
    return await super.handle(params)
  }
}
