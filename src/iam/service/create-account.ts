import { AccountNotFoundError, createAccount, EmailAlreadyInUseError, PersistDataChangeError } from '@/iam'
import { GetAccountByEmailRepository, SaveAccountRepository } from '@/iam/domain/repository'
import { CreateAccount } from '@/iam/domain/service'

export class DbCreateAccount implements CreateAccount {
  constructor (
    private readonly readRepo: GetAccountByEmailRepository,
    private readonly saveRepo: SaveAccountRepository
  ) {}

  async create (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { email } = params
    const retrievedAccount = await this.readRepo.getByEmail(email)
    if (!(retrievedAccount instanceof AccountNotFoundError)) return new EmailAlreadyInUseError(email)
    const newAccount = createAccount(params)
    if (!(await this.saveRepo.save(newAccount))) return new PersistDataChangeError(newAccount.constructor.name)
    return newAccount
  }
}
