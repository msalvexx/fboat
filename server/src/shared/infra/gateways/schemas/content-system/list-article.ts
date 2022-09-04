import { ListArticlesRepository } from '@/content-system/domain'
import { tags } from './commons'
import builder from 'fluent-json-schema'

const querystring = builder
  .object()
  .prop('pageNumber', builder.integer().default(ListArticlesRepository.Default.pageNumber))
  .prop('pageSize', builder.integer().default(ListArticlesRepository.Default.pageSize).maximum(50))
  .prop('mostRecent', builder.boolean().default(ListArticlesRepository.Default.mostRecent))
  .prop('isFeatured', builder.boolean().default(ListArticlesRepository.Default.isFeatured))
  .prop('isPublished', builder.boolean().default(ListArticlesRepository.Default.isPublished))
  .prop('authorId', builder.string().format('uuid'))

export const listArticleSchema = {
  description: 'List articles schema',
  querystring,
  tags
}
