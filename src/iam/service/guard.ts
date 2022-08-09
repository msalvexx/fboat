import { AccountModifier, ChangeAccount, ChangePassword, CreateAccount } from '@/iam/domain/protocols'
import { UnauthorizedError, User } from '@/iam/domain'

export class AccountGuard implements AccountModifier {
  constructor (
    private readonly decoratee: AccountModifier,
    private readonly loggedUser: User
  ) {}

  async create (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    if (!this.loggedUser.hasPermission('CreateAccount')) throw new UnauthorizedError()
    return await this.decoratee.create(params)
  }

  async changeAccount (params: ChangeAccount.Params): Promise<void> {
    if (!this.loggedUser.hasPermission('ChangeAccount') && params.email !== this.loggedUser.email) throw new UnauthorizedError()
    await this.decoratee.changeAccount(params)
  }

  async changePassword (params: ChangePassword.Params): Promise<void> {
    if (!this.loggedUser.hasPermission('ChangePassword') && params.email !== this.loggedUser.email) throw new UnauthorizedError()
    await this.decoratee.changePassword(params)
  }
}
