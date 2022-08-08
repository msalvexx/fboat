import { Account, AdminPermission, FBoatControllerPermission, FBoatReaderPermission, OwnerPermission, WriterPermission, Permission, Role, User } from '@/iam/domain/model'
import { CreateAccount } from '@/iam/domain/protocols'
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

const createRole = (roleName: string, permissions: Permission[]): Role => {
  const role = new Role(roleName)
  role.changePermissions(permissions)
  return role
}

export const createAvailableRoles = (): Role[] => {
  const ownerPermissions: OwnerPermission[] = ['ChangeAccount', 'ChangePassword', 'DeleteAccount']
  const writerPermissions: WriterPermission[] = ['CreateArticle', 'ChangeArticle', 'PublishArticle', 'DeleteArticle']
  const fBoatReaderPermissions: FBoatReaderPermission[] = ['ReadFBoatData']
  const fBoatControllerPermissions: FBoatControllerPermission[] = ['ControlFBoat']
  const adminPermissions: AdminPermission[] = [
    ...ownerPermissions,
    ...writerPermissions,
    ...fBoatReaderPermissions,
    ...fBoatControllerPermissions,
    'ChangeRole'
  ]
  return [
    createRole('Writer', writerPermissions),
    createRole('Owner', ownerPermissions),
    createRole('FBoatController', fBoatControllerPermissions),
    createRole('FBoatReader', fBoatReaderPermissions),
    createRole('Administrator', adminPermissions)
  ]
}

export const availableRoles: Role[] = createAvailableRoles()
