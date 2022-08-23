export class SlugAlreadyInUseError extends Error {
  readonly statusCode: number = 400

  constructor (slug: string) {
    super(`Slug: ${slug} is already in use`)
    this.name = 'SlugAlreadyInUseError'
  }
}
