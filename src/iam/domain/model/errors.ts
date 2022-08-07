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
