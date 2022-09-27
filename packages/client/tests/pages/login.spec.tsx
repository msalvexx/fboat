import React from 'react'
import { act, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { populateField, render, simulateSubmit, testStatusForField } from '@/tests/helpers'

import { AccountCredentials } from '@/client/domain/models'
import { InvalidCredentialsError } from '@/client/domain'
import { FieldError } from '@/client/presentation/protocols'
import { Login } from '@/client/presentation/pages'
import { AuthenticateUser } from '@fboat/core'

type SutTypes = {
  service: jest.Mock
  setCurrentAccountMock: (account: AccountCredentials) => void
  result: AuthenticateUser.Result
  navigate: jest.Mock
}

const renderSut = (errors: FieldError[] | undefined = undefined): SutTypes => {
  const service = jest.fn()
  const result = {
    personName: faker.name.fullName(),
    token: faker.datatype.uuid(),
    avatar: faker.image.avatar()
  }
  service.mockResolvedValue(result)
  const { setCurrentAccountMock, navigate } = render({
    Page: () => <Login authenticate={service} validator={() => errors}/>,
    history: ['/login']
  })
  return { service, setCurrentAccountMock, result, navigate }
}

const simulateValidSubmit = async (): Promise<{ email: string, password: string }> => {
  const email = populateField('email')
  const password = populateField('password')
  await act(async () => await simulateSubmit())
  return { email, password }
}

describe('Login Page', () => {
  test('Should start page with initial behavior', () => {
    renderSut()

    expect(screen.getByTestId('form-status-wrap').children).toHaveLength(0)
    testStatusForField('email')
    testStatusForField('password')
  })

  test('Should show password error if validation fails', async () => {
    const message = faker.random.word()
    const errors = [{ field: 'password', message }]
    renderSut(errors)

    await simulateSubmit()

    testStatusForField('password', message)
  })

  test('Should show email error if validation fails', async () => {
    const message = faker.random.word()
    const errors = [{ field: 'email', message }]
    renderSut(errors)

    await simulateSubmit()

    testStatusForField('email', message)
  })

  test('Should show load spinner when a valid submit', async () => {
    renderSut()

    await simulateValidSubmit()

    expect(screen.getByTestId('spinner')).toBeDefined()
  })

  test('Should call authentication service with correct values', async () => {
    const { service } = renderSut()

    const { email, password } = await simulateValidSubmit()

    expect(service).toHaveBeenCalledWith({ email, password })
  })

  test('Should present error if authentication fails', async () => {
    const { service } = renderSut()
    const error = new InvalidCredentialsError()
    service.mockRejectedValueOnce(error)

    await simulateValidSubmit()

    expect(screen.getByTestId('form-status-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { setCurrentAccountMock, result, navigate } = renderSut()

    const { email } = await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith({
      avatar: result.avatar,
      token: result.token,
      name: result.personName,
      email
    })
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
