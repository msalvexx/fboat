import React from 'react'
import { screen } from '@testing-library/react'
import { render, simulateSubmit, testStatusForField } from '@/tests/helpers'

import { EditArticle } from '@/client/presentation/pages'
import { faker } from '@faker-js/faker'

type SutParams = {
  validatorMock?: jest.Mock
  loadArticleMock?: jest.Mock
}

const renderSut = ({ validatorMock = jest.fn(), loadArticleMock = jest.fn() }: SutParams = {}): void => {
  render({ Page: () => <EditArticle validator={validatorMock} />, history: ['/'] })
}

describe('Edit Article Page', () => {
  test('Will present correct initial create state', () => {
    renderSut()

    expect(screen.getByTestId('title')).toHaveAttribute('data-value', '')
    expect(screen.getByTestId('title')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('description')).toHaveAttribute('data-value', '')
    expect(screen.getByTestId('description')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('content')).toHaveAttribute('data-value', '')
    expect(screen.getByTestId('content')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('coverPhoto')).toHaveAttribute('data-value', '')
    expect(screen.getByTestId('coverPhoto')).toHaveAttribute('data-status', 'valid')
  })

  test('Should show title error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'title', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('title', message)
  })

  test('Should show content error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'content', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('content', message)
  })

  test('Should show description error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'description', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('description', message)
  })

  test('Should show coverPhoto error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'coverPhoto', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('coverPhoto', message)
  })

  // test('Will present correct initial edit state', async () => {
  //   const article = mockArticle()
  //   const loadArticleMock = jest.fn(async () => await Promise.resolve(article))

  //   renderSut({ loadArticleMock })
  //   await waitFor(() => expect(loadArticleMock).toHaveBeenCalled())

  //   expect(screen.getByTestId('title')).toHaveAttribute('data-value', article.title)
  //   expect(screen.getByTestId('description')).toHaveAttribute('data-value', article.summary)
  //   expect(screen.getByTestId('content')).toHaveAttribute('data-value', article.content)
  //   expect(screen.getByTestId('coverPhoto')).toHaveAttribute('data-value', article.coverPhoto)
  // })
})
