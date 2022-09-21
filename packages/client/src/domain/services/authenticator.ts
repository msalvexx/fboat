import { AuthenticateUser } from '@fboat/core/src/iam'
import { InvalidCredentialsError, UnexpectedError } from '@/client/domain/models'
import { HttpClient, HttpStatusCode } from '@/client/domain/protocols'

export class Authentication implements AuthenticateUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
