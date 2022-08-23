import { User, Permission, UnauthorizedError } from '@/iam'
import { AbstractHandler } from "."

export class AuthorizationHandler extends AbstractHandler {
  constructor (private readonly permission: Permission) {
    super()
  }

  override async handle (params: any): Promise<any> {
    if (!('loggedAccount' in params)) throw new UnauthorizedError()
    const loggedUser: User = params.loggedAccount.user
    if (!loggedUser.hasPermission(this.permission)) throw new UnauthorizedError()
    return await super.handle(params)
  }
}
