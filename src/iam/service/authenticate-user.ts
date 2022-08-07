import { GetAccountByEmailRepository, Account, UnauthorizedError } from '@/iam'
import { AuthenticateUser } from '@/iam/domain/service'
import { HashComparer, TokenGenerator } from '@/iam/domain/protocols'

export class DbAuthenticateUser implements AuthenticateUser {
  constructor (
    private readonly readRepo: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const { email, password: digest } = params
    const retrievedAccount = await this.readRepo.getByEmail(email)
    if (!(retrievedAccount instanceof Account)) return new UnauthorizedError()
    const { userId, password } = retrievedAccount.user
    if (!(await this.hashComparer.compare(password, digest))) return new UnauthorizedError()
    const { accountId } = retrievedAccount
    const token = await this.tokenGenerator.generate({ accountId, userId })
    return {
      token,
      personName: retrievedAccount.personalData.fullName
    }
  }
}
