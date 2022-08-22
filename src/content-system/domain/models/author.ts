export namespace Author {
  export type Params = {
    accountId: string
    name: string
    occupation: string
    photo: string | null
  }
}

export class Author {
  readonly name: string
  readonly accountId: string
  readonly occupation: string
  readonly photo: string | null

  constructor (params: Author.Params) {
    const { accountId, name, occupation, photo } = params
    this.accountId = accountId
    this.name = name
    this.occupation = occupation
    this.photo = photo
  }
}
