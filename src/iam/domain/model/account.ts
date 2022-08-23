import { User, PersonalData } from '.'

export namespace Account {
  export type Params = {
    accountId: string
    user: User.Params
    personalData: PersonalData.Params
    creationDate?: Date
    updateDate?: Date
    isActive?: boolean
  }
}

export class Account {
  private _personalData: PersonalData
  private _isActive: boolean = true
  readonly accountId: string
  readonly user: User
  readonly updateDate: Date
  readonly creationDate: Date

  constructor (params: Account.Params) {
    const now = new Date()
    now.setMilliseconds(0)
    this.accountId = params.accountId
    this.user = new User(params.user)
    this.creationDate = params.creationDate ?? now
    this.updateDate = params.updateDate ?? now
    this._isActive = params.isActive ?? true
    this._personalData = new PersonalData(params.personalData)
  }

  changePersonalData (personalData: PersonalData.Params): void {
    this._personalData = new PersonalData(personalData)
  }

  changeAccountActivation (isActive: boolean): void {
    this._isActive = isActive
  }

  public get isActive (): boolean {
    return this._isActive
  }

  public get personalData (): PersonalData {
    return this._personalData
  }
}
