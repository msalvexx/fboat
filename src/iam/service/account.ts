import { Account, AccountNotFoundError, createAccount, EmailAlreadyInUseError } from '@/iam/domain/model'
import { AccountRepository, CreateAccount, AccountModifier, ChangeAccount, ChangePassword, Hasher, GetAccount } from '@/iam/domain/protocols'

export class AccountService implements AccountModifier, GetAccount {
  constructor (
    private readonly repo: AccountRepository,
    private readonly hasher: Hasher
  ) {}

  async getAccount (id: GetAccount.Params): Promise<GetAccount.Result> {
    const account = await this.getAccountByAccountId(id)
    return this.toAccountResult(account)
  }

  async createAccount (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    if (await this.repo.getByEmail(email) !== undefined) throw new EmailAlreadyInUseError(email)
    params.password = await this.hasher.generate(params.password)
    const newAccount = createAccount(params)
    await this.repo.save(newAccount)
    return this.toAccountResult(newAccount)
  }

  async changeAccount (params: ChangeAccount.Params): Promise<ChangeAccount.Result> {
    const retrievedAccount = await this.getAccountByAccountId(params.id)
    retrievedAccount.changePersonalData(params.personalData)
    retrievedAccount.changeAccountActivation(params.isActive)
    retrievedAccount.user.changeRoles(params.roles)
    await this.repo.save(retrievedAccount)
  }

  async changePassword (params: ChangePassword.Params): Promise<ChangePassword.Result> {
    const retrievedAccount = await this.getAccountByAccountId(params.id)
    const hashedPassword = await this.hasher.generate(params.newPassword)
    retrievedAccount.user.changePassword(hashedPassword)
    await this.repo.save(retrievedAccount)
  }

  private async getAccountByAccountId (accountId: string): Promise<Account> {
    const accountParams = await this.repo.getByAccountId(accountId)
    if (accountParams === undefined) throw new AccountNotFoundError(accountId)
    return new Account(accountParams)
  }

  private toAccountResult (account: Account): Account.Params {
    return {
      accountId: account.accountId,
      personalData: account.personalData,
      user: {
        userId: account.user.userId,
        email: account.user.email,
        roles: account.user.roles.map(x => x.name)
      },
      creationDate: account.creationDate,
      updateDate: account.updateDate,
      isActive: account.isActive
    }
  }
}
