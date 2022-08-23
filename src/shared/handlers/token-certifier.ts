import { AuthenticationCertifier } from '@/iam/domain/protocols'
import { AbstractHandler } from './handler'

export class TokenCertifierHandler extends AbstractHandler {
  constructor (private readonly authService: AuthenticationCertifier) {
    super()
  }

  override async handle (params: any): Promise<any> {
    const token = params.authorization ?? ''
    const loggedAccount = await this.authService.certificate(token)
    params = { ...params, loggedAccount }
    return await super.handle(params)
  }
}
