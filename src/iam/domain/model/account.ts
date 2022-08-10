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
  constructor (private readonly data: PersonalData.Params) {
    data.birthDate.setMilliseconds(0)
  }

  get fullName (): string {
    return `${this.data.firstName} ${this.data.lastName}`
  }

  get firstName (): string {
    return this.data.firstName
  }

  get lastName (): string {
    return this.data.lastName
  }

  get occupation (): string {
    return this.data.occupation
  }

  get birthDate (): Date {
    return this.data.birthDate
  }
}

export class Account {
  private _personalData: PersonalData
  private _isActive: boolean = true

  constructor (
    readonly accountId: string,
    readonly user: User,
    personalData: PersonalData.Params,
    readonly creationDate: Date = new Date(),
    readonly updateDate: Date = new Date()
  ) {
    creationDate.setMilliseconds(0)
    updateDate.setMilliseconds(0)
    this.changePersonalData(personalData)
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
