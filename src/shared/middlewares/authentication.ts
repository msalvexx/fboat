import { AuthenticationCertifier } from '@/iam'
import { AbstractHandler } from '.'

export class AuthenticationHandler extends AbstractHandler {
  constructor (private readonly authService: AuthenticationCertifier) {
    super()
  }

  override async handle (params: any): Promise<any> {
    const token = params.authorization ?? ''
    await this.authService.certificate(token)
  }
}
