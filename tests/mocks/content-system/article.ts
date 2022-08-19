import { SaveArticleRepository } from '@/content-system'

export class SaveArticleRepositoryMock implements SaveArticleRepository {
  params: SaveArticleRepository.Params

  async save (params: SaveArticleRepository.Params): Promise<SaveArticleRepository.Result> {
    this.params = params
  }
}
