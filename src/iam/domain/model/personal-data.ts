export namespace PersonalData {
  export type Params = {
    photo?: string | null | undefined
    firstName: string
    lastName: string
    occupation: string
    birthDate: Date
    defaultPhoto?: string | null | undefined
  }
}

export class PersonalData {
  readonly photo: string | null
  readonly firstName: string
  readonly lastName: string
  readonly occupation: string
  readonly birthDate: Date

  constructor (params: PersonalData.Params) {
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.occupation = params.occupation
    this.photo = params.photo ?? params.defaultPhoto ?? null
    this.birthDate = new Date(params.birthDate)
    this.birthDate.setMilliseconds(0)
  }

  get fullName (): string {
    return `${this.firstName} ${this.lastName}`
  }
}
