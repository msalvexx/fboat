import { ResourceNotFoundError } from '../../shared/models'

export class EmailAlreadyInUseError extends Error {
  readonly statusCode: number = 400

  constructor (email: string) {
    super(`Email: ${email} is already in use`)
    this.name = 'EmailAlreadyInUseError'
  }
}

export class PersistDataChangeError extends Error {
  readonly statusCode: number = 500

  constructor (type: string) {
    super(`Failed to persist changes on ${type}`)
    this.name = 'PersistDataChangeError'
  }
}

export class AccountNotFoundError extends ResourceNotFoundError {
  constructor (accountId: string) {
    super('AccountNotFoundError', `There is no account associated with accountId: ${accountId}`)
  }
}

export class UnauthorizedError extends Error {
  readonly statusCode: number = 401

  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  readonly statusCode: number = 403

  constructor () {
    super('Forbidden')
    this.name = 'ForbiddenError'
  }
}
