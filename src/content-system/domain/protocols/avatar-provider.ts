
export namespace AvatarPhotoProvider {
  export type Params = string
  export type Result = string
}

export interface AvatarPhotoProvider {
  get: (params: AvatarPhotoProvider.Params) => Promise<AvatarPhotoProvider.Result>
}
