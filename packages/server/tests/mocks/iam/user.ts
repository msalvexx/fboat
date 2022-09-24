import { User } from '@fboat/core/iam/models'

export type MockUserParams = {
  userId?: string
  email?: string
  password?: string
  roles?: string[]
}

export const defaultUser: MockUserParams = { userId: '123', email: 'valid@mail.com', password: '123', roles: [] }

export const mockUserParams = (params: MockUserParams = defaultUser): MockUserParams => {
  const userId: any = params.userId ?? defaultUser.userId
  const email: any = params.email ?? defaultUser.email
  const password: any = params.password ?? defaultUser.password
  const roles: any = params.roles ?? defaultUser.roles
  return {
    userId,
    email,
    password,
    roles
  }
}

export const mockUser = (params: MockUserParams = defaultUser): User => {
  return new User(mockUserParams(params) as any)
}
