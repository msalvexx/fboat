import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { faker } from '@faker-js/faker'

export class AuthenticateUserSpy implements AuthenticateUser {
  params!: any
  result = {
    personName: faker.name.fullName(),
    token: faker.datatype.uuid()
  }

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    this.params = params
    return this.result
  }
}
