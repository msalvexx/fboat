import { User, Permission, UnauthorizedError, ForbiddenError } from '@fboat/core'
import { AbstractController } from './controller'

export class AuthorizationController extends AbstractController {
  constructor (private readonly permission: Permission) {
    super()
  }

  override async handle (params: any): Promise<any> {
    if (!('loggedAccount' in params)) throw new UnauthorizedError()
    const loggedUser: User = params.loggedAccount.user
    if (!loggedUser.hasPermission(this.permission)) throw new ForbiddenError()
    return await super.handle(params)
  }
}
