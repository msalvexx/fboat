import { Account, AccountNotFoundError, createAccount, EmailAlreadyInUseError, findRolesByName, PersistDataChangeError, UnauthorizedError } from '@/iam/domain/model'
import { AccountRepository, CreateAccount, AccountModifier, ChangeAccount, ChangePassword, Hasher } from '@/iam/domain/protocols'

export class AccountService implements AccountModifier {
  constructor (
    private readonly repo: AccountRepository,
    private readonly hasher: Hasher
  ) {}

  async create (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.repo.getByEmail(email)
    if (!(retrievedAccount instanceof AccountNotFoundError)) return new EmailAlreadyInUseError(email)
    params.password = await this.hasher.generate(params.password)
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
    if (!(await this.hasher.compare(password, digest)) || !retrievedAccount.isActive) return new UnauthorizedError()
    const hashedPassword = await this.hasher.generate(newPassword)
    retrievedAccount.user.changePassword(hashedPassword)
    if (!(await this.repo.save(retrievedAccount))) return new PersistDataChangeError(retrievedAccount.constructor.name)
  }
}
