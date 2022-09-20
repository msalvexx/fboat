import React from 'react'
import { render as reactRender, screen } from '@testing-library/react'

import { Login } from '@/client/presentation/pages'
import { RecoilRoot } from 'recoil'

const render = (Page: React.FC): void => {
  reactRender(
    <RecoilRoot>
      <Page/>
    </RecoilRoot>
  )
}
const makeSut = (): void => render(() => <Login />)

export const testStatusForField = (fieldName: string, validationError = ''): void => {
  const field = screen.getByTestId(fieldName)
  expect(field).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  if (!validationError) {
    expect(() => { screen.getByTestId(`${fieldName}-alert`) }).toThrow()
    return
  }
  const alert = screen.getByTestId(`${fieldName}-alert`)
  expect(alert).toHaveProperty('title', validationError)
}

describe('Login Page', () => {
  test('Should start page with initial behavior', () => {
    makeSut()

    expect(screen.getByTestId('form-status-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('email')
    testStatusForField('password')
  })

  test('Should page with initial behavior', () => {
    makeSut()

    expect(screen.getByTestId('form-status-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('email')
    testStatusForField('password')
  })
})
