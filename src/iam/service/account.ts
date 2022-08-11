import { Account, AccountNotFoundError, createAccount, EmailAlreadyInUseError } from '@/iam/domain/model'
import { AccountRepository, CreateAccount, AccountModifier, ChangeAccount, ChangePassword, Hasher, GetAccount } from '@/iam/domain/protocols'

export class AccountService implements AccountModifier, GetAccount {
  constructor (
    private readonly repo: AccountRepository,
    private readonly hasher: Hasher
  ) {}

  async getAccount (email: GetAccount.Params): Promise<GetAccount.Result> {
    const retrievedAccount = await this.getAccountByEmail(email)
    if (retrievedAccount === undefined) throw new AccountNotFoundError(email)
    return retrievedAccount
  }

  async createAccount (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    if (await this.repo.getByEmail(email) !== undefined) throw new EmailAlreadyInUseError(email)
    params.password = await this.hasher.generate(params.password)
    const newAccount = createAccount(params)
    await this.repo.save(newAccount)
    return newAccount
  }

  async changeAccount (params: ChangeAccount.Params): Promise<ChangeAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.getAccountByEmail(email) as Account
    retrievedAccount.changePersonalData(params.personalData)
    retrievedAccount.changeAccountActivation(params.isActive)
    retrievedAccount.user.changeRoles(params.roles)
    await this.repo.save(retrievedAccount)
  }

  async changePassword (params: ChangePassword.Params): Promise<ChangePassword.Result> {
    const { email, newPassword } = params
    const retrievedAccount = await this.getAccountByEmail(email) as Account
    const hashedPassword = await this.hasher.generate(newPassword)
    retrievedAccount.user.changePassword(hashedPassword)
    await this.repo.save(retrievedAccount)
  }

  private async getAccountByEmail (email: string): Promise<Account | undefined> {
    const accountParams = await this.repo.getByEmail(email)
    if (accountParams === undefined) return undefined
    return new Account(accountParams)
  }
}
