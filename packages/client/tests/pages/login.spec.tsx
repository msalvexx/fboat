import React from 'react'
import { screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { populateField, render, simulateSubmit, testStatusForField } from '@/tests/helpers'
import { AuthenticateUserSpy } from '@/tests/mocks'

import { Login } from '@/client/presentation/pages'
import { FieldError } from '@/client/presentation/protocols'
import { InvalidCredentialsError } from '@/client/domain'

type SutTypes = {
  service: AuthenticateUserSpy
}

const renderSut = (errors: FieldError[] | undefined = undefined): SutTypes => {
  const service = new AuthenticateUserSpy()
  render(() => <Login service={service} validator={() => errors}/>)
  return { service }
}

const simulateValidSubmit = async (): Promise<{ email: string, password: string }> => {
  const email = populateField('email')
  const password = populateField('password')
  await simulateSubmit()
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

    expect(service.params).toStrictEqual({ email, password })
  })

  test('Should present error if authentication fails', async () => {
    const { service } = renderSut()
    const error = new InvalidCredentialsError()
    service.result = error

    await simulateValidSubmit()

    expect(screen.getByTestId('form-status-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })
})
