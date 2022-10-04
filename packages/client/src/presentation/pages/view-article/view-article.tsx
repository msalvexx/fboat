import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import Styles from './view-article-styles.scss'

import { GetArticle } from '@fboat/core'
import { Article, Handler } from '@/client/domain'
import { Header, Avatar, Footer, Spinner, Slider, ArticleProps } from '@/client/presentation/components'
import { articleResultState, relatedArticlesResultState } from './atom'

type Props = {
  loadArticle: Handler<GetArticle.Result>
  loadRelated: Handler<Article[]>
}

const ViewArticle: React.FC<Props> = ({ loadArticle, loadRelated }) => {
  const navigate = useNavigate()
  const [articleState, setArticleState] = useRecoilState(articleResultState)
  const [relatedState, setRelatedState] = useRecoilState(relatedArticlesResultState)
  const mapRelated = (related: Article[]): ArticleProps[] => related.map(x => ({
    author: x.author.name,
    avatar: x.author.photo,
    coverPhoto: x.coverPhoto,
    description: x.summary,
    publishDate: x.publishDate,
    slug: x.slug,
    title: x.title
  }))

  useEffect(() => {
    loadArticle({})
      .then(article => setArticleState(({ isLoading: false, value: article })))
      .catch(error => {
        setArticleState(({ ...articleState, isLoading: false }))
        navigate('/404')
        console.error(error)
      })

    loadRelated({})
      .then(related => setRelatedState(({ isLoading: false, value: mapRelated(related) })))
      .catch(error => {
        setRelatedState(({ ...relatedState, isLoading: false }))
        console.error(error)
      })
  }, [])

  return (
    <>
      <Header/>
      {articleState.isLoading
        ? <Spinner data-testid='article-spinner'/>
        : <article data-testid='article' className={Styles.viewArticle}>
          <h1 data-testid='article-title'>{articleState.value?.title}</h1>
          <p data-testid='article-description'>{articleState.value?.summary}</p>
          <Avatar avatar={articleState.value?.author?.photo} title={articleState.value?.author?.name} subtitle={articleState.value?.creationDate?.toLocaleDateString()} />
          <img data-testid='article-cover' src={articleState.value?.coverPhoto} />
          <div data-testid='article-content' dangerouslySetInnerHTML={{ __html: articleState.value?.content }}></div>
        </article>}
      {articleState.isLoading
        ? <Spinner data-testid='related-spinner'/>
        : <Slider data-testid='related-slider' className='uk-padding-remove-top' sliderName='Mais conteúdos deste autor' articles={relatedState.value}/>}
      <Footer/>
    </>
  )
}

export default ViewArticle
