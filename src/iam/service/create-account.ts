import { createAccount, EmailAlreadyInUseError, PersistDataChangeError } from '@/iam'
import { GetAccountByEmailRepository, SaveAccountRepository } from '@/iam/domain/repository'
import { CreateAccount } from '@/iam/domain/usecase'

export class DbCreateAccount {
  constructor (
    private readonly readRepo: GetAccountByEmailRepository,
    private readonly saveRepo: SaveAccountRepository
  ) {}

  async create (params: CreateAccount.Params): Promise<any> {
    const { email } = params
    const retrievedAccount = this.readRepo.getByEmail(email)
    if ((await retrievedAccount).user.email === email) return new EmailAlreadyInUseError(email)
    const newAccount = createAccount(params)
    if (!(await this.saveRepo.save(newAccount))) return new PersistDataChangeError(newAccount.constructor.name)
    return newAccount
  }
}
