import { AvatarPhotoProvider } from '@/server/iam/protocols'

export class UiAvatarPhotoProvider implements AvatarPhotoProvider {
  private readonly configs = {
    baseUrl: 'https://ui-avatars.com/api/',
    format: 'svg',
    rounded: 'true',
    size: '128'
  }

  async get (name: AvatarPhotoProvider.Params): Promise<AvatarPhotoProvider.Result> {
    name = name.replace(' ', '+')
    const { baseUrl, format, rounded, size } = this.configs
    return `${baseUrl}?format=${format}&rounded=${rounded}&name=${name}&size=${size}`
  }
}
