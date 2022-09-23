import { PersonalData } from '../../iam'

export namespace ChangeAccount {
  export type Params = {
    accountId: string
    roles: string[]
    personalData: PersonalData.Params
    isActive: boolean
  }

  export type Result = void
}

export interface ChangeAccount {
  changeAccount: (params: ChangeAccount.Params) => Promise<ChangeAccount.Result>
}
