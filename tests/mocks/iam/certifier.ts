import { AuthenticationCertifier, UnauthorizedError } from '@/iam/domain'
import { mockAccount } from './account'

export class AuthenticationCertifierMock implements AuthenticationCertifier {
  result: any = mockAccount()

  async certificate (token: string): Promise<AuthenticationCertifier.Result> {
    if (!this.result) throw new UnauthorizedError()
    return this.result
  }
}
