import { AuthenticationCertifier } from '@fboat/core'
import { AbstractController } from './controller'

export class TokenCertifierController extends AbstractController {
  constructor (private readonly authService: AuthenticationCertifier) {
    super()
  }

  override async handle (params: any): Promise<any> {
    const token = params.authorization ?? ''
    try {
      const loggedAccount = await this.authService.certificate(token)
      params = { ...params, loggedAccount }
    } catch (e) {
      console.log(`Error while validating token: ${e}`)
    }
    return await super.handle(params)
  }
}
