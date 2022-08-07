export namespace UserActivation {
  export type Params = {
    userId: string
    password: string
  }

  export type Result = boolean
}

export interface ActivateUser {
  activate: (params: UserActivation.Params) => Promise<UserActivation.Result>
}

export interface DeactivateUser {
  deactivate: (params: UserActivation.Params) => Promise<UserActivation.Result>
}
