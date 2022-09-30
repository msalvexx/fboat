import { SaveAttachment } from '@fboat/core/content-system/protocols'
import { AbstractController } from '@/server/shared/controllers'

export class FileUploadController extends AbstractController {
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
