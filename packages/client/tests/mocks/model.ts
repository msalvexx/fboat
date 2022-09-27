import { faker } from '@faker-js/faker'
import { Account } from '@fboat/core/iam/models'
import { AccountCredentials } from '@/client/domain/models'
import { GetArticle } from '@fboat/core'

export const mockAccountCredentials = (): AccountCredentials => ({
  token: faker.datatype.uuid(),
  name: faker.name.fullName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email()
})

type AccountModelParams = {
  roles?: string[]
}

export const mockAccountModel = ({ roles }: AccountModelParams = {}): Account => new Account({
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
    roles: roles ?? faker.helpers.arrayElements(['Administrator', 'Writer'])
  }
})

export const mockArticle = (): GetArticle.Result => ({
  articleId: faker.datatype.uuid(),
  author: {
    accountId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    occupation: faker.name.jobTitle(),
    photo: faker.image.avatar()
  },
  coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
  creationDate: faker.date.recent(),
  isFeatured: faker.datatype.boolean(),
  isPublished: faker.datatype.boolean(),
  publishDate: faker.date.recent(),
  revisionDate: faker.date.recent(),
  slug: faker.lorem.slug(),
  summary: faker.lorem.sentences(),
  title: faker.lorem.sentence(),
  content: faker.lorem.text()
})
