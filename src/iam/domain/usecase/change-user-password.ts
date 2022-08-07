export namespace ChangeUserPassword {
  export type Params = {
    email: string
    password: string
  }

  export type Result = boolean
}

export interface ChangeUserPassword {
  change: (params: ChangeUserPassword.Params) => Promise<ChangeUserPassword.Result>
}
