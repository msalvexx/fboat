export class ResourceNotFoundError extends Error {
  readonly statusCode: number = 404

  constructor (name: string = 'ResourceNotFoundError', message: string = 'The resource was not found') {
    super(message)
    this.name = name
  }
}

export class ConnectionNotFoundError extends Error {
  readonly statusCode: number = 500

  constructor () {
    super('ConnectionNotFoundError')
    this.name = 'ConnectionNotFoundError'
  }
}

export class TransactionNotFoundError extends Error {
  readonly statusCode: number = 500

  constructor () {
    super('TransactionNotFoundError')
    this.name = 'TransactionNotFoundError'
  }
}

export class StorageFileError extends Error {
  readonly statusCode: number = 500

  constructor () {
    super('An error happened while persisting or removing file')
    this.name = 'StorageFileError'
  }
}
