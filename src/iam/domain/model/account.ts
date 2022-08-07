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

  public get updateDate (): Date {
    return this._updateDate
  }

  public get personalData (): PersonalData {
    return this._personalData
  }
}
