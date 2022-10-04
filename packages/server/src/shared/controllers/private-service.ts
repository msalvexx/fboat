import { UnauthorizedError } from '@fboat/core'
import { AbstractController } from './controller'

export class PrivateServiceController extends AbstractController {
  override async handle (params: any): Promise<any> {
    if (!('loggedAccount' in params)) throw new UnauthorizedError()
    return await super.handle(params)
  }
}
