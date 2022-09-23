import { AccountModifier, GetAccount, CreateAccount, ChangeAccount, ChangePassword } from '@fboat/core/iam/protocols'
import { createAccount, Account, EmailAlreadyInUseError, AccountNotFoundError } from '@fboat/core/iam/models'
import { AccountRepository, Hasher, AvatarPhotoProvider } from '@/server/iam/protocols'

export class AccountService implements AccountModifier, GetAccount {
  constructor (
    private readonly repo: AccountRepository,
    private readonly hasher: Hasher,
    private readonly avatarProvider: AvatarPhotoProvider
  ) {}

  async getAccount ({ accountId }: GetAccount.Params): Promise<GetAccount.Result> {
    const account = await this.getAccountByAccountId(accountId)
    return this.toAccountResult(account)
  }

  async createAccount (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    if (await this.repo.getByEmail(email) !== undefined) throw new EmailAlreadyInUseError(email)
    const fullName = `${params.personalData.firstName} ${params.personalData.lastName}`
    const [password, defaultPhoto] = await Promise.all([this.hasher.generate(params.password), this.avatarProvider.get(fullName)])
    params.password = password
    params.personalData.defaultPhoto = defaultPhoto
    const newAccount = createAccount(params)
    await this.repo.insert(newAccount)
    return this.toAccountResult(newAccount)
  }

  async changeAccount ({ accountId, personalData, isActive, roles }: ChangeAccount.Params): Promise<ChangeAccount.Result> {
    const retrievedAccount = await this.getAccountByAccountId(accountId)
    retrievedAccount.changePersonalData(personalData)
    retrievedAccount.changeAccountActivation(isActive)
    retrievedAccount.user.changeRoles(roles)
    await this.repo.update(retrievedAccount)
  }

  async changePassword ({ accountId, newPassword }: ChangePassword.Params): Promise<ChangePassword.Result> {
    const retrievedAccount = await this.getAccountByAccountId(accountId)
    const hashedPassword = await this.hasher.generate(newPassword)
    retrievedAccount.user.changePassword(hashedPassword)
    await this.repo.update(retrievedAccount)
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
