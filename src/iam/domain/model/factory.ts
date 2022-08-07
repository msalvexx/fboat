import { Account, CreateAccount, User } from '@/iam'
import { v4 as uuidv4 } from 'uuid'

type UserParam = {
  email: string
  password: string
}

const createUser = (params: UserParam): User => {
  const { email, password } = params
  return new User(uuidv4(), email, password)
}

export const createAccount = (params: CreateAccount.Params): Account => {
  const { email, password, ...personalData } = params
  const userParam = { email, password }
  return new Account(uuidv4(), createUser(userParam), personalData)
}
