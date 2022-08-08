import { Account, AccountNotFoundError, createAccount, EmailAlreadyInUseError, findRolesByName, PersistDataChangeError, UnauthorizedError } from '@/iam/domain/model'
import { AccountRepository, AuthenticateUser, CreateAccount, AccountServices, Cryptography, ChangeAccount, ChangePassword } from '@/iam/domain/protocols'

export class AccountService implements AccountServices {
  constructor (
    private readonly repo: AccountRepository,
    private readonly crypto: Cryptography
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const { email, password: digest } = params
    const retrievedAccount = await this.repo.getByEmail(email)
    if (!(retrievedAccount instanceof Account) || !retrievedAccount.isActive) return new UnauthorizedError()
    const { userId, password } = retrievedAccount.user
    if (!(await this.crypto.compare(password, digest))) return new UnauthorizedError()
    const { accountId } = retrievedAccount
    const token = await this.crypto.generateToken({ accountId, userId, email })
    return {
      token,
      personName: retrievedAccount.personalData.fullName
    }
  }

  async create (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.repo.getByEmail(email)
    if (!(retrievedAccount instanceof AccountNotFoundError)) return new EmailAlreadyInUseError(email)
    params.password = await this.crypto.generateHash(params.password)
    const newAccount = createAccount(params)
    if (!(await this.repo.save(newAccount))) return new PersistDataChangeError(newAccount.constructor.name)
    return newAccount
  }

  async change (params: ChangeAccount.Params): Promise<ChangeAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.repo.getByEmail(email) as Account
    retrievedAccount.changePersonalData(params.personalData)
    retrievedAccount.changeAccountActivation(params.isActive)
    const roles = findRolesByName(params.roles)
    retrievedAccount.user.changeRoles(roles)
    if (!(await this.repo.save(retrievedAccount))) return new PersistDataChangeError(retrievedAccount.constructor.name)
  }

  async changePassword (params: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { email, oldPassword: digest, newPassword } = params
    const retrievedAccount = await this.repo.getByEmail(email) as Account
    const { password } = retrievedAccount.user
    if (!(await this.crypto.compare(password, digest)) || !retrievedAccount.isActive) return new UnauthorizedError()
    const hashedPassword = await this.crypto.generateHash(newPassword)
    retrievedAccount.user.changePassword(hashedPassword)
    if (!(await this.repo.save(retrievedAccount))) return new PersistDataChangeError(retrievedAccount.constructor.name)
  }
}
