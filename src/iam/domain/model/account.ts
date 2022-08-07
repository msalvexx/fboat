import { User } from '@/iam'

export type PersonalData = {
  firstName: string
  lastName: string
  occupation: string
  birthDate: Date
}

export class Account {
  private _updateDate = new Date()

  constructor (
    readonly accountId: string,
    readonly user: User,
    private _personalData: PersonalData,
    readonly creationDate: Date = new Date()
  ) {}

  changePersonalData (personalData: PersonalData): void {
    this._personalData = personalData
    this._updateDate = new Date()
  }

  public get updateDate (): Date {
    return this._updateDate
  }

  public get personalData (): PersonalData {
    return this._personalData
  }
}
