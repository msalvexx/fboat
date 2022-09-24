import { faker } from '@faker-js/faker'
import { Account, getAvailableRoleNames } from '@fboat/core'
import { AccountCredentials } from '@/client/domain/models'

export const mockAccountCredentials = (): AccountCredentials => ({
  token: faker.datatype.uuid(),
  name: faker.name.fullName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email()
})

export const mockAccountModel = (): Account => new Account({
  accountId: faker.datatype.uuid(),
  personalData: {
    birthDate: faker.date.past(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    occupation: faker.name.jobTitle(), 
    photo: faker.image.avatar(),
    defaultPhoto: faker.image.avatar()
  },
  user: {
    userId: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.datatype.uuid(),
    roles: faker.helpers.arrayElements(getAvailableRoleNames())
  }
})
