export namespace PersonalData {
  export type Params = {
    firstName: string
    lastName: string
    occupation: string
    birthDate: Date
  }
}

export class PersonalData {
  readonly firstName: string
  readonly lastName: string
  readonly occupation: string
  readonly birthDate: Date

  constructor (params: PersonalData.Params) {
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.occupation = params.occupation
    this.birthDate = new Date(params.birthDate)
    this.birthDate.setMilliseconds(0)
  }

  get fullName (): string {
    return `${this.firstName} ${this.lastName}`
  }
}
