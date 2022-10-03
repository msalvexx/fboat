import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { attachFile, populateField, render, testStatusForField } from '@/tests/helpers'
import { mockArticle } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

import { UnexpectedError } from '@/client/domain'
import { EditArticle } from '@/client/presentation/pages'
import { editArticleState } from '@/client/presentation/pages/edit-article/atom'
import { ContentState, EditorState } from 'draft-js'

type SutParams = {
  uploadImageMock?: jest.Mock
  validatorMock?: jest.Mock
  loadArticleMock?: jest.Mock
  saveArticleMock?: jest.Mock
  content?: EditorState
}

const mockedState = {
  articleId: '',
  contentError: '',
  wasSubmitted: false,
  title: '',
  titleError: '',
  summary: '',
  summaryError: '',
  coverPhoto: '',
  coverPhotoError: '',
  isFormInvalid: false,
  savingChanges: false,
  mainError: '',
  submitter: ''
}

type SutTypes = {
  navigate: jest.Mock
}

const imageMock = { url: faker.image.imageUrl(), fileName: `${faker.lorem.word()}.png` }
const defaultUploadImageMock = jest.fn(async () => await Promise.resolve(imageMock))

const renderSut = ({ validatorMock = jest.fn(), loadArticleMock = undefined, saveArticleMock = jest.fn(), uploadImageMock = defaultUploadImageMock, content = EditorState.createEmpty() }: SutParams = {}): SutTypes => {
  const { navigate } = render({
    Page: () => <EditArticle
      uploadImage={uploadImageMock}
      saveArticle={saveArticleMock}
      loadArticle={loadArticleMock}
      validator={validatorMock} />,
    history: ['/'],
    states: [
      { atom: editArticleState, value: { content, ...mockedState } }
    ]
  })
  return { navigate }
}

type ValidSubmitResult = {
  title: string
  summary: string
  coverPhoto: File
}

const simulateSubmit = async (fieldName = 'publish'): Promise<void> => {
  const button = screen.getByTestId(fieldName)
  fireEvent.click(button)
  await waitFor(() => button)
}

const simulateValidSubmit = async (fieldName = 'publish'): Promise<ValidSubmitResult> => {
  const title = populateField('title')
  const summary = populateField('summary')
  const coverPhoto = attachFile('coverPhoto')
  await simulateSubmit(fieldName)
  return { title, summary, coverPhoto }
}

describe('Edit Article Page', () => {
  test('Will present correct initial create state', () => {
    renderSut()

    expect(screen.getByTestId('title')).toHaveAttribute('value', '')
    expect(screen.getByTestId('title')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('summary')).toHaveAttribute('value', '')
    expect(screen.getByTestId('summary')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('content')).toHaveAttribute('data-status', 'valid')
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

  test('Should show summary error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'summary', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('summary', message)
  })

  test('Should show coverPhoto error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'coverPhoto', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('coverPhoto', message)
  })

  test('Will call load case function is defined', async () => {
    const article = mockArticle()
    const loadArticleMock = jest.fn(async () => await Promise.resolve(article))

    renderSut({ loadArticleMock })

    await waitFor(() => expect(loadArticleMock).toHaveBeenCalledTimes(1))
  })

  test('Will present correct initial edit state', async () => {
    const article = mockArticle()
    const loadArticleMock = jest.fn(async () => await Promise.resolve(article))

    renderSut({ loadArticleMock })

    await waitFor(() => expect(screen.getByTestId('editor')).toHaveAttribute('data-mode', 'edit'))
    await waitFor(() => expect(screen.getByTestId('editor')).toHaveAttribute('data-articleid', article.articleId))

    expect(screen.getByTestId('title')).toHaveAttribute('value', article.title)
    expect(screen.getByTestId('summary')).toHaveAttribute('value', article.summary)
  })

  test('Should show publishing alert when a valid submit', async () => {
    renderSut()

    await simulateValidSubmit()

    expect(screen.queryByTestId('saving-alert')).toHaveTextContent('Publicando artigo...')
  })

  test('Should call upload image with correct value', async () => {
    const uploadImageMock = jest.fn()
    const content = EditorState.createWithContent(ContentState.createFromText(faker.lorem.words()))
    renderSut({ uploadImageMock, content })

    const { coverPhoto } = await simulateValidSubmit()

    expect(uploadImageMock).toBeCalledTimes(1)
    expect(uploadImageMock).toHaveBeenCalledWith({ file: coverPhoto })
  })

  test('Should call save article with correct values', async () => {
    const saveArticleMock = jest.fn()
    const textContent = faker.lorem.words()
    const content = EditorState.createWithContent(ContentState.createFromText(textContent))
    renderSut({ saveArticleMock, content })

    const fields = await simulateValidSubmit()

    expect(saveArticleMock).toBeCalledTimes(1)
    expect(saveArticleMock).toHaveBeenCalledWith({ ...fields, isPublished: true, content: `<p>${textContent}</p>\n`, coverPhoto: imageMock.url })
  })

  test('Should show unexpected error alert when save fails', async () => {
    const error = new UnexpectedError()
    const saveArticleMock = jest.fn(async () => await Promise.reject(error))
    const content = EditorState.createWithContent(ContentState.createFromText(faker.lorem.words()))
    renderSut({ saveArticleMock, content })

    await simulateValidSubmit()

    await waitFor(() => saveArticleMock)
    expect(screen.queryByTestId('error-alert')).toHaveTextContent(error.message)
  })

  test('Should show unexpected error alert when upload fails', async () => {
    const error = new UnexpectedError()
    const uploadImageMock = jest.fn(async () => await Promise.reject(error))
    const content = EditorState.createWithContent(ContentState.createFromText(faker.lorem.words()))
    renderSut({ uploadImageMock, content })

    await simulateValidSubmit()

    await waitFor(() => uploadImageMock)
    expect(screen.queryByTestId('error-alert')).toHaveTextContent(error.message)
  })

  test('Should navigate to my article case article saved successfully', async () => {
    const saveArticleMock = jest.fn()
    const content = EditorState.createWithContent(ContentState.createFromText(faker.lorem.words()))
    const { navigate } = renderSut({ saveArticleMock, content })

    await simulateValidSubmit()

    expect(navigate).toHaveBeenCalledWith('/my-articles')
  })
})
