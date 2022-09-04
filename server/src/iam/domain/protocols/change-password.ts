export namespace ChangePassword {
  export type Params = {
    accountId: string
    newPassword: string
  }

  export type Result = void
}

export interface ChangePassword {
  changePassword: (params: ChangePassword.Params) => Promise<ChangePassword.Result>
}
