import { faker } from '@faker-js/faker'
import { AuthenticateUser } from '@fboat/core/iam/protocols'

export const mockAccountModel = (): AuthenticateUser.Result => ({
  token: faker.datatype.uuid(),
  personName: faker.name.fullName(),
  avatar: faker.image.avatar()
})
