import React from 'react'
import { fireEvent, render as reactRender, screen, waitFor } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { faker } from '@faker-js/faker'

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

const makeSut = (errors: FieldError[] | undefined = undefined): void => render(() => <Login validator={setupMockValidator(errors)}/>)

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

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

const simulateValidSubmit = async (): Promise<void> => {
  populateField('email')
  populateField('password')
  await simulateSubmit()
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
})
