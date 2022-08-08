import { User } from '@/iam'

export namespace PersonalData {
  export type Params = {
    firstName: string
    lastName: string
    occupation: string
    birthDate: Date
  }
}

class PersonalData {
  constructor (private readonly data: PersonalData.Params) {}

  get fullName (): string {
    return `${this.data.firstName} ${this.data.lastName}`
  }
}

export class Account {
  private _updateDate = new Date()
  private _personalData: PersonalData
  private _isActive: boolean = true

  constructor (
    readonly accountId: string,
    readonly user: User,
    personalData: PersonalData.Params,
    readonly creationDate: Date = new Date()
  ) {
    this.changePersonalData(personalData)
  }

  changePersonalData (personalData: PersonalData.Params): void {
    this._personalData = new PersonalData(personalData)
    this._updateDate = new Date()
  }

  changeAccountActivation (isActive: boolean): void {
    this._isActive = isActive
  }

  public get isActive (): boolean {
    return this._isActive
  }

  public get updateDate (): Date {
    return this._updateDate
  }

  public get personalData (): PersonalData {
    return this._personalData
  }
}
