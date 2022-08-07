import { Account, AccountNotFoundError, createAccount, EmailAlreadyInUseError, PersistDataChangeError, UnauthorizedError } from '@/iam/domain/model'
import { AccountRepository, AuthenticateUser, CreateAccount, AccountServices, Cryptography } from '@/iam/domain/protocols'

export class AccountService implements AccountServices {
  constructor (
    private readonly repo: AccountRepository,
    private readonly crypto: Cryptography
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const { email, password: digest } = params
    const retrievedAccount = await this.repo.getByEmail(email)
    if (!(retrievedAccount instanceof Account)) return new UnauthorizedError()
    const { userId, password } = retrievedAccount.user
    if (!(await this.crypto.compare(password, digest))) return new UnauthorizedError()
    const { accountId } = retrievedAccount
    const token = await this.crypto.generate({ accountId, userId, email })
    return {
      token,
      personName: retrievedAccount.personalData.fullName
    }
  }

  async create (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.repo.getByEmail(email)
    if (!(retrievedAccount instanceof AccountNotFoundError)) return new EmailAlreadyInUseError(email)
    const newAccount = createAccount(params)
    if (!(await this.repo.save(newAccount))) return new PersistDataChangeError(newAccount.constructor.name)
    return newAccount
  }
}
