import { AccountModifier, ChangeAccount, ChangePassword, CreateAccount, GetAccount } from '@/iam/domain/protocols'
import { Account, UnauthorizedError, User } from '@/iam/domain'

export class AccountGuard implements AccountModifier, GetAccount {
  constructor (
    private readonly decoratee: AccountModifier & GetAccount,
    private readonly loggedUser: User
  ) {}

  async getAccount (email: string): Promise<Account> {
    if (!this.loggedUser.hasPermission('GetAccount') && email !== this.loggedUser.email) throw new UnauthorizedError()
    return await this.decoratee.getAccount(email)
  }

  async createAccount (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    if (!this.loggedUser.hasPermission('CreateAccount')) throw new UnauthorizedError()
    return await this.decoratee.createAccount(params)
  }

  async changeAccount (params: ChangeAccount.Params): Promise<void> {
    if (!this.loggedUser.hasPermission('ChangeAccount') && params.accountId !== this.loggedUser.email) throw new UnauthorizedError()
    await this.decoratee.changeAccount(params)
  }

  async changePassword (params: ChangePassword.Params): Promise<void> {
    if (!this.loggedUser.hasPermission('ChangePassword') && params.accountId !== this.loggedUser.email) throw new UnauthorizedError()
    await this.decoratee.changePassword(params)
  }
}
