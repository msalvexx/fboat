import { GetArticle } from '@fboat/core'
import { atom } from 'recoil'
import { ArticleProps } from '@/client/presentation/components'

export const articleResultState = atom({
  key: 'articleResultState',
  default: {
    isLoading: true,
    value: null as GetArticle.Result
  }
})

export const relatedArticlesResultState = atom({
  key: 'relatedArticlesResultState',
  default: {
    isLoading: true,
    value: [] as ArticleProps[]
  }
})
