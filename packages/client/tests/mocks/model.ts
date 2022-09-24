import { faker } from '@faker-js/faker'
import { Account } from '@/client/domain/models'

export const mockAccountModel = (): Account => ({
  token: faker.datatype.uuid(),
  name: faker.name.fullName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email()
})
