import { Account, AdminPermission, FBoatControllerPermission, FBoatReaderPermission, WriterPermission, Permission, Role } from '.'
import { CreateAccount } from '../../iam/protocols'
import { newUuid } from '../../shared/gateways'

export const createAccount = (params: CreateAccount.Params): Account => {
  const { email, password, roles, personalData } = params
  return new Account({
    accountId: newUuid(),
    user: {
      userId: newUuid(),
      email,
      password,
      roles
    },
    personalData
  })
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
    'ListAccounts',
    'GetAccount',
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
