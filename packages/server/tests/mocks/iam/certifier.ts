import { UnauthorizedError } from '@fboat/core/iam/models'
import { AuthenticationCertifier } from '@fboat/core/iam/protocols'
import { mockAccount } from './account'

export class AuthenticationCertifierMock implements AuthenticationCertifier {
  result: any = mockAccount()

  async certificate (token: string): Promise<AuthenticationCertifier.Result> {
    if (!this.result) throw new UnauthorizedError()
    return this.result
  }
}
