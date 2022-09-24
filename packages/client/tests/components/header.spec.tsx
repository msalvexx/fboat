import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/tests/helpers'

import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { Header } from '@/client/presentation/components'
import { mockAccountModel } from '@/tests/mocks'

type SutParams = {
  account?: AuthenticateUser.Result
}

const renderSut = ({ account = mockAccountModel() }: SutParams = { account: mockAccountModel() }): void => {
  render({
    Page: () => <Header/>,
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
})
