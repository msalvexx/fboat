import { SaveAttachment } from '@/content-system'
import { AbstractController } from '@/shared/controllers'

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
