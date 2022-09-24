import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockAccountModel } from '@/tests/mocks'

import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { Header } from '@/client/presentation/components'

type SutParams = {
  account?: AuthenticateUser.Result
  hidePrimaryAction?: boolean
}
const defaultSut = { account: mockAccountModel(), hidePrimaryAction: false }
const renderSut = ({ account = mockAccountModel(), hidePrimaryAction = false }: SutParams = defaultSut): void => {
  render({
    Page: () => <Header buttonHidden={hidePrimaryAction}/>,
    history: ['/'],
    account
  })
}

describe('Header Component', () => {
  test('Should not show account menu when no account is logged', () => {
    const account = null
    renderSut({ account })

    expect(() => screen.getByTestId('account-menu')).toThrow()
    expect(() => screen.getByTestId('login-action')).not.toThrow()
  })

  test('Should show account menu when account is logged', () => {
    renderSut()

    expect(() => screen.getByTestId('account-menu')).not.toThrow()
    expect(() => screen.getByTestId('new-article-action')).not.toThrow()
    expect(() => screen.getByTestId('login-action')).toThrow()
  })

  test('Should not show any button action', () => {
    renderSut({ hidePrimaryAction: true })

    expect(screen.getByTestId('primary-action-wrapper')).not.toBeVisible()
  })
})
