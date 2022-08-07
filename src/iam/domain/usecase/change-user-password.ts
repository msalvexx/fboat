export namespace ChangeUserPassword {
  export type Params = {
    userId: string
    password: string
  }

  export type Result = boolean
}

export interface ChangeUserPassword {
  change: (params: ChangeUserPassword.Params) => Promise<ChangeUserPassword.Result>
}
