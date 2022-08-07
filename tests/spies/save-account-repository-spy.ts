import { SaveAccountRepository, Account } from '@/iam'

export class SaveAccountRepositorySpy implements SaveAccountRepository {
  account: Account
  calls: number = 0
  result: boolean = true

  async save (account: SaveAccountRepository.Params): Promise<SaveAccountRepository.Result> {
    this.account = account
    this.calls++
    return this.result
  }
}
