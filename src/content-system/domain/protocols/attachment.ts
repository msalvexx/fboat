export namespace SaveAttachment {
  export type Params = { file: Buffer, extension: string }
  export type Result = { url: string, fileName: string }
}

export interface SaveAttachment {
  save: (file: SaveAttachment.Params) => Promise<SaveAttachment.Result>
}

export namespace RemoveAttachment {
  export type Params = {
    fileName: string
  }
}

export interface RemoveAttachment {
  remove: (params: RemoveAttachment.Params) => Promise<void>
}
