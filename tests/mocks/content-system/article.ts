import { GetArticleRepository, SaveArticleRepository } from '@/content-system'

export class SaveArticleRepositoryMock implements SaveArticleRepository, GetArticleRepository {
  params: SaveArticleRepository.Params
  getResult: any = undefined

  async save (params: SaveArticleRepository.Params): Promise<SaveArticleRepository.Result> {
    this.params = params
  }

  async get (id: GetArticleRepository.Params): Promise<GetArticleRepository.Result> {
    return this.getResult
  }
}
