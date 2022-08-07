export class EmailAlreadyInUseError extends Error {
  constructor (email: string) {
    super(`Email: ${email} is already in use`)
    this.name = 'EmailAlreadyInUseError'
  }
}

export class PersistDataChangeError extends Error {
  constructor (type: string) {
    super(`Failed to persist changes on ${type}`)
    this.name = 'PersistDataChangeError'
  }
}

export class AccountNotFoundError extends Error {
  constructor (email: string) {
    super(`There is no account associated with this email: ${email}`)
    this.name = 'AccountNotFoundError'
  }
}
