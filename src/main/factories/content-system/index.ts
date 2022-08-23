import { MySQLArticleRepository } from '@/content-system/infra'
import { ArticleService } from '@/content-system/services'

export const makeArticleRepository = (): MySQLArticleRepository => new MySQLArticleRepository()
export const makeArticleService = (): ArticleService => new ArticleService(makeArticleRepository())
