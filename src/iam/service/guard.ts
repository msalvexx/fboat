import { AccountModifier, ChangeAccount, ChangePassword, CreateAccount, GetAccount } from '@/iam/domain/protocols'
import { Account, UnauthorizedError } from '@/iam/domain'

export class AccountGuard implements AccountModifier, GetAccount {
  constructor (
    private readonly decoratee: AccountModifier & GetAccount,
    private readonly loggedAccount: Account
  ) {}

  async getAccount (id: string): Promise<GetAccount.Result> {
    if (!this.loggedAccount.user.hasPermission('GetAccount') && id !== this.loggedAccount.accountId) throw new UnauthorizedError()
    return await this.decoratee.getAccount(id)
  }

  async createAccount (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    if (!this.loggedAccount.user.hasPermission('CreateAccount')) throw new UnauthorizedError()
    return await this.decoratee.createAccount(params)
  }

  async changeAccount (params: ChangeAccount.Params): Promise<void> {
    if (!this.loggedAccount.user.hasPermission('ChangeAccount') && params.id !== this.loggedAccount.accountId) throw new UnauthorizedError()
    await this.decoratee.changeAccount(params)
  }

  async changePassword (params: ChangePassword.Params): Promise<void> {
    if (!this.loggedAccount.user.hasPermission('ChangePassword') && params.id !== this.loggedAccount.accountId) throw new UnauthorizedError()
    await this.decoratee.changePassword(params)
  }
}
