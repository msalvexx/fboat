export namespace AvatarPhotoProvider {
  export type Params = string
  export type Result = string | null
}

export interface AvatarPhotoProvider {
  get: (params: AvatarPhotoProvider.Params) => Promise<AvatarPhotoProvider.Result>
}
