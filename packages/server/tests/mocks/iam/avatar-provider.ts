import { AvatarPhotoProvider } from '@/server/iam/protocols'

export class AvatarPhotoProviderMock implements AvatarPhotoProvider {
  error = false
  params: any
  result = 'any'

  async get (name: AvatarPhotoProvider.Params): Promise<AvatarPhotoProvider.Result> {
    if (this.error) throw new Error()
    this.params = name
    return this.result
  }
}
