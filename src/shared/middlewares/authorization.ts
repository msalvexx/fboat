import { Permission, UnauthorizedError } from '@/iam'
import { AbstractHandler } from "."

export class AuthorizationHandler extends AbstractHandler {
  constructor (private readonly permission: Permission) {
    super()
  }

  override async handle (params: any): Promise<any> {
    if (!('loggedAccount' in params)) throw new UnauthorizedError()
  }
}
