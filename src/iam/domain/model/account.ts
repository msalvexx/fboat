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
    private readonly user: User,
    private personalData: PersonalData,
    readonly creationDate: Date = new Date()
  ) {
    this.accountId = user.email
  }

  changePersonalData (personalData: PersonalData): void {
    this.personalData = personalData
    this._updateDate = new Date()
  }

  public get updateDate (): Date {
    return this._updateDate
  }

  getPersonalData (): PersonalData {
    return this.personalData
  }
}
