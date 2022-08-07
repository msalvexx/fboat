export namespace ChangeUserRoles {
  export type Params = string[]

  export type Result = boolean
}

export interface ChangeUserRoles {
  change: (params: ChangeUserRoles.Params) => Promise<ChangeUserRoles.Result>
}
