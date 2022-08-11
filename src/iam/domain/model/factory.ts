import { Account, AdminPermission, FBoatControllerPermission, FBoatReaderPermission, WriterPermission, Permission, Role, User } from '@/iam/domain/model'
import { CreateAccount } from '@/iam/domain/protocols'
import { v4 as uuidv4 } from 'uuid'

type UserParam = {
  email: string
  password: string
  roles?: Role[]
}

const createUser = (params: UserParam): User.Params => {
  const { email, password } = params
  return { userId: uuidv4(), email, password }
}

export const createAccount = (params: CreateAccount.Params): Account => {
  const { email, password, ...personalData } = params
  const userParam = { email, password }
  return new Account({ accountId: uuidv4(), user: createUser(userParam), personalData })
}

const createRole = (roleName: string, permissions: Permission[]): Role => {
  const role = new Role(roleName)
  role.changePermissions(permissions)
  return role
}

export const createAvailableRoles = (): Role[] => {
  const writerPermissions: WriterPermission[] = ['CreateArticle', 'ChangeArticle', 'PublishArticle', 'DeleteArticle']
  const fBoatReaderPermissions: FBoatReaderPermission[] = ['ReadFBoatData']
  const fBoatControllerPermissions: FBoatControllerPermission[] = ['ControlFBoat']
  const adminPermissions: AdminPermission[] = [
    ...writerPermissions,
    ...fBoatReaderPermissions,
    ...fBoatControllerPermissions,
    'ChangeRole',
    'CreateAccount',
    'ChangeAccount',
    'ChangePassword',
    'DeleteAccount'
  ]
  return [
    createRole('Writer', writerPermissions),
    createRole('FBoatController', fBoatControllerPermissions),
    createRole('FBoatReader', fBoatReaderPermissions),
    createRole('Administrator', adminPermissions)
  ]
}

export const availableRoles: Role[] = createAvailableRoles()
