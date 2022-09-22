export interface GetStorage {
  get: (key: string) => any
}

export interface SetStorage {
  set: (key: string, value: object | undefined) => void
}

export type Storage = GetStorage & SetStorage
