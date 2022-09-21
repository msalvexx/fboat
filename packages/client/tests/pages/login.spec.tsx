import React from 'react'
import { fireEvent, render as reactRender, screen, waitFor } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { faker } from '@faker-js/faker'
import { AuthenticateUserSpy } from '@/tests/mocks'

import { Login } from '@/client/presentation/pages'
import { FieldError, Validator } from '@/client/presentation/protocols'

const render = (Page: React.FC): void => {
  reactRender(
    <RecoilRoot>
      <Page/>
    </RecoilRoot>
  )
}
const setupMockValidator = (errors: FieldError[] | undefined = undefined): Validator => () => errors

type SutTypes = {
  service: AuthenticateUserSpy
}

const makeSut = (errors: FieldError[] | undefined = undefined): SutTypes => {
  const service = new AuthenticateUserSpy()
  render(() => <Login service={service} validator={setupMockValidator(errors)}/>)
  return { service }
}

export const testStatusForField = (fieldName: string, validationError = ''): void => {
  const field = screen.getByTestId(fieldName)
  expect(field).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  if (!validationError) {
    expect(() => { screen.getByTestId(`${fieldName}-alert`) }).toThrow()
    return
  }
  const alert = screen.getByTestId(`${fieldName}-alert`)
  expect(alert).toHaveTextContent(validationError)
}

const simulateSubmit = async (): Promise<void> => {
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

export const populateField = (fieldName: string, value = faker.random.word()): string => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
  return value
}

const simulateValidSubmit = async (): Promise<{ email: string, password: string }> => {
  const email = populateField('email')
  const password = populateField('password')
  await simulateSubmit()
  return { email, password }
}

describe('Login Page', () => {
  test('Should start page with initial behavior', () => {
    makeSut()

    expect(screen.getByTestId('form-status-wrap').children).toHaveLength(0)
    testStatusForField('email')
    testStatusForField('password')
  })

  test('Should show password error if validation fails', async () => {
    const message = faker.random.word()
    const errors = [{ field: 'password', message }]
    makeSut(errors)

    await simulateSubmit()

    testStatusForField('password', message)
  })

  test('Should show email error if validation fails', async () => {
    const message = faker.random.word()
    const errors = [{ field: 'email', message }]
    makeSut(errors)

    await simulateSubmit()

    testStatusForField('email', message)
  })

  test('Should show load spinner when a valid submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.getByTestId('spinner')).toBeDefined()
  })

  test('Should call authentication service with correct values', async () => {
    const { service } = makeSut()

    const { email, password } = await simulateValidSubmit()

    expect(service.params).toStrictEqual({ email, password })
  })
})
