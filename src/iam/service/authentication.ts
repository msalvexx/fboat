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
    const retrievedAccountParams = await this.repo.getByEmail(email)
    if (retrievedAccountParams === undefined || !retrievedAccountParams.isActive) throw new UnauthorizedError()
    const retrievedAccount = new Account(retrievedAccountParams)
    const isMatch = await this.hasher.compare(digest, retrievedAccount.user.password)
    if (!isMatch) throw new UnauthorizedError()
    const token = await this.crypto.generate({ accountId: retrievedAccount.accountId, userId: retrievedAccount.user.userId, email })
    return {
      token,
      personName: retrievedAccount.personalData.fullName
    }
  }

  async certificate (params: AuthenticationCertifier.Params): Promise<AuthenticationCertifier.Result> {
    try {
      const { email } = await this.crypto.verify(params)
      const accountParams = await this.repo.getByEmail(email) as Account.Params
      return new Account(accountParams)
    } catch {
      throw new UnauthorizedError()
    }
  }
}
