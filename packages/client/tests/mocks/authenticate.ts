import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { faker } from '@faker-js/faker'

export class AuthenticateUserSpy implements AuthenticateUser {
  params!: any
  result: any = {
    personName: faker.name.fullName(),
    token: faker.datatype.uuid(),
    avatar: faker.image.avatar()
  }

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    this.params = params
    if (this.result instanceof Error) throw this.result
    return this.result
  }
}
