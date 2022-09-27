import React from 'react'
import { waitFor, screen } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockArticle } from '@/tests/mocks'

import { GetArticle } from '@fboat/core'
import { Article } from '@/client/domain'
import { ViewArticle } from '@/client/presentation/pages'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadArticleMock: jest.Mock<Promise<GetArticle.Result>>
  loadRelatedArticlesMock: jest.Mock<Promise<Article[]>>
  article: GetArticle.Result
  relatedArticles: GetArticle.Result[]
  container: HTMLElement
}

const renderSut = (): SutTypes => {
  const article = mockArticle()
  const relatedArticles = Array.from({ length: faker.datatype.number(10) }, mockArticle)
  const loadArticleMock = jest.fn(async () => await Promise.resolve(article))
  const loadRelatedArticlesMock = jest.fn(async () => await Promise.resolve(relatedArticles))
  const { container } = render({
    Page: () => <ViewArticle loadRelated={loadRelatedArticlesMock} loadArticle={loadArticleMock}/>,
    history: ['/']
  })
  return { loadArticleMock, article, container, loadRelatedArticlesMock, relatedArticles }
}

describe('View Article Page', () => {
  test('Should call loadArticle', async () => {
    const { loadArticleMock } = renderSut()

    await waitFor(async () => expect(loadArticleMock).toHaveBeenCalled())
  })

  test('Should call loadRelatedArticles', async () => {
    const { loadRelatedArticlesMock } = renderSut()

    await waitFor(async () => expect(loadRelatedArticlesMock).toHaveBeenCalled())
  })

  test('Should show article spinner on init page', async () => {
    renderSut()

    expect(screen.getByTestId('article-spinner')).toBeVisible()
  })

  test('Should show related spinner on init page', async () => {
    renderSut()

    expect(screen.getByTestId('related-spinner')).toBeVisible()
  })

  test('Should show the correct title', async () => {
    const { article } = renderSut()

    await waitFor(() => screen.getByTestId('article'))

    expect(screen.getByTestId('article-title')).toHaveTextContent(article.title)
  })

  test('Should show the correct cover image', async () => {
    const { article } = renderSut()

    await waitFor(() => screen.getByTestId('article'))

    expect(screen.getByTestId('article-cover')).toHaveAttribute('src', article.coverPhoto)
  })

  test('Should show the correct description', async () => {
    const { article } = renderSut()

    await waitFor(() => screen.getByTestId('article'))

    expect(screen.getByTestId('article-description')).toHaveTextContent(article.summary)
  })

  test('Should show the correct avatar', async () => {
    const { article, container } = renderSut()

    await waitFor(() => screen.getByTestId('article'))

    const element = container.querySelector('[data-testid=article]')
    expect(element.querySelector('[data-testid=avatar-photo]')).toHaveAttribute('src', article.author.photo)
    expect(element.querySelector('[data-testid=avatar-title]')).toHaveTextContent(article.author.name)
    expect(element.querySelector('[data-testid=avatar-subtitle]')).toHaveTextContent(article.creationDate.toLocaleDateString())
  })

  test('Should show the correct content', async () => {
    const { article } = renderSut()

    await waitFor(() => screen.getByTestId('article'))

    expect(screen.getByTestId('article-content')).toHaveTextContent(article.content)
  })

  test('Should show the correct slider', async () => {
    const { relatedArticles, container } = renderSut()

    await waitFor(() => screen.getByTestId('related-slider'))

    const element = container.querySelector('[data-testid=related-slider] [data-testid=slider-items]')
    expect(element.children).toHaveLength(relatedArticles.length)
  })
})
