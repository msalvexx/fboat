import { ResourceNotFoundError } from '../../shared/models'

export class SlugAlreadyInUseError extends Error {
  readonly statusCode: number = 400

  constructor (slug: string) {
    super(`Slug: ${slug} is already in use`)
    this.name = 'SlugAlreadyInUseError'
  }
}

export class AuthorNotFoundError extends ResourceNotFoundError {
  override readonly statusCode: number = 400

  constructor (authorId: string) {
    super('AuthorNotFoundError', `There is no author associated with authorId: ${authorId}`)
  }
}
