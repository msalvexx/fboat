import { Account, AccountNotFoundError, createAccount, EmailAlreadyInUseError, findRolesByName } from '@/iam/domain/model'
import { AccountRepository, CreateAccount, AccountModifier, ChangeAccount, ChangePassword, Hasher, GetAccount } from '@/iam/domain/protocols'

export class AccountService implements AccountModifier, GetAccount {
  constructor (
    private readonly repo: AccountRepository,
    private readonly hasher: Hasher
  ) {}

  async getAccount (email: GetAccount.Params): Promise<GetAccount.Result> {
    const account = await this.repo.getByEmail(email)
    if (account === undefined) throw new AccountNotFoundError(email)
    return account
  }

  async createAccount (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    if (await this.repo.getByEmail(email)) throw new EmailAlreadyInUseError(email)
    params.password = await this.hasher.generate(params.password)
    const newAccount = createAccount(params)
    await this.repo.save(newAccount)
    return newAccount
  }

  async changeAccount (params: ChangeAccount.Params): Promise<ChangeAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.repo.getByEmail(email) as Account
    retrievedAccount.changePersonalData(params.personalData)
    retrievedAccount.changeAccountActivation(params.isActive)
    const roles = findRolesByName(params.roles)
    retrievedAccount.user.changeRoles(roles)
    await this.repo.save(retrievedAccount)
  }

  async changePassword (params: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { email, newPassword } = params
    const retrievedAccount = await this.repo.getByEmail(email) as Account
    const hashedPassword = await this.hasher.generate(newPassword)
    retrievedAccount.user.changePassword(hashedPassword)
    await this.repo.save(retrievedAccount)
  }
}
