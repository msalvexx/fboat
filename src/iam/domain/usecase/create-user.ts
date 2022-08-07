import { User } from '@/iam'

export namespace CreateUser {
  export type Params = {
    login: string
    email: string
    password: string
  }

  export type Result = User
}

export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>
}
