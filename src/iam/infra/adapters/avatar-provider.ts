import { AvatarPhotoProvider } from '@/iam/domain'

import { HttpGetClient } from '@/shared/protocols'

export class UiAvatarPhotoProvider implements AvatarPhotoProvider {
  private readonly baseUrl = 'https://ui-avatars.com/api'

  constructor (private readonly httpClient: HttpGetClient) { }

  async get (name: AvatarPhotoProvider.Params): Promise<AvatarPhotoProvider.Result> {
    try {
      return await this.httpClient.get({ url: this.baseUrl, params: { name } })
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
