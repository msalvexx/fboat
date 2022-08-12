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
  constructor (accountId: string) {
    super(`There is no account associated with this accountId: ${accountId}`)
    this.name = 'AccountNotFoundError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ConnectionNotFoundError extends Error {
  constructor () {
    super('ConnectionNotFoundError')
    this.name = 'ConnectionNotFoundError'
  }
}

export class TransactionNotFoundError extends Error {
  constructor () {
    super('TransactionNotFoundError')
    this.name = 'TransactionNotFoundError'
  }
}
