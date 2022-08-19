import { AvatarPhotoProvider } from '@/content-system/domain/protocols'

export class AvatarPhotoProviderMock implements AvatarPhotoProvider {
  error: boolean = false
  params: any
  result: string = 'any'

  async get (name: AvatarPhotoProvider.Params): Promise<AvatarPhotoProvider.Result> {
    if (this.error) throw new Error()
    this.params = name
    return this.result
  }
}
