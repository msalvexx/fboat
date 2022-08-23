import { Permission } from '@/iam/domain/model'
import { MySQLConnectionManager } from '@/shared/infra'
import { TokenCertifierHandler, AccountToAuthorMapperHandler, AuthorizationHandler, ServiceHandler, MethodHandler } from '@/shared/handlers'
import { makeAuthenticationService } from '@/main/factories'

export const makeServiceHandler = (methodHandler: MethodHandler, instance: Object): ServiceHandler => new ServiceHandler(methodHandler, instance)
export const makeTokenCertifierHandler = (): TokenCertifierHandler => new TokenCertifierHandler(makeAuthenticationService())
export const makeAuthorizationHandler = (permission: Permission): AuthorizationHandler => new AuthorizationHandler(permission)
export const makeAccountToAuthorMapperHandler = (): AccountToAuthorMapperHandler => new AccountToAuthorMapperHandler()
export const startDbConnection = async (config: any = null): Promise<MySQLConnectionManager> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect(config)
  return connectionManager
}
export const stopDbConnection = async (): Promise<void> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.disconnect()
}
