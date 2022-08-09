import { GetAccountByEmailRepository, Cryptography, Hasher, AuthenticateUser, Authenticator, AuthenticationCertifier } from '@/iam/domain/protocols'
import { Account, UnauthorizedError } from '@/iam'

export class AuthenticationService implements Authenticator, AuthenticationCertifier {
  constructor (
    private readonly repo: GetAccountByEmailRepository,
    private readonly crypto: Cryptography,
    private readonly hasher: Hasher
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const { email, password: digest } = params
    const retrievedAccount = await this.repo.getByEmail(email)
    if (!(retrievedAccount instanceof Account) || !retrievedAccount.isActive) throw new UnauthorizedError()
    const { userId, password } = retrievedAccount.user
    if (!(await this.hasher.compare(password, digest))) throw new UnauthorizedError()
    const { accountId } = retrievedAccount
    const token = await this.crypto.generate({ accountId, userId, email })
    return {
      token,
      personName: retrievedAccount.personalData.fullName
    }
  }

  async certificate (params: AuthenticationCertifier.Params): Promise<AuthenticationCertifier.Result> {
    try {
      const { email } = await this.crypto.verify(params)
      const account = await this.repo.getByEmail(email) as Account
      return account.user
    } catch {
      throw new UnauthorizedError()
    }
  }
}
