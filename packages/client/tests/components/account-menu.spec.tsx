import React from 'react'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockAccountCredentials, mockAccountModel } from '@/tests/mocks'

import { Account } from '@fboat/core'
import { AccountCredentials } from '@/client/domain'
import { AccountMenu } from '@/client/presentation/components'

type SutParams = {
  account?: Account
  accountCredentials?: AccountCredentials
}

type SutTypes = {
  setCurrentAccountMock: (account: AccountCredentials) => void
  navigate: jest.Mock
}

const renderSut = ({ account, accountCredentials }: SutParams): SutTypes => {
  const { setCurrentAccountMock, navigate } = render({
    Page: () => <AccountMenu />,
    history: ['/'],
    account,
    accountCredentials
  })
  return { setCurrentAccountMock, navigate }
}

describe('Account Menu', () => {
  test('Should present the correct email', () => {
    const accountCredentials = mockAccountCredentials()

    renderSut({ accountCredentials })

    expect(screen.getByTestId('avatar-subtitle')).toContainHTML(accountCredentials.email)
  })

  test('Should present the correct name', () => {
    const accountCredentials = mockAccountCredentials()

    renderSut({ accountCredentials })

    expect(screen.getByTestId('avatar-title')).toContainHTML(accountCredentials.name)
  })

  test('Should present the correct photo', () => {
    const accountCredentials = mockAccountCredentials()

    renderSut({ accountCredentials })

    expect(screen.getByTestId('avatar-photo')).toHaveAttribute('src', accountCredentials.avatar)
  })

  test('Should show admin options if user has permission', () => {
    const account = mockAccountModel({ roles: ['Administrator'] })

    renderSut({ account })

    expect(() => screen.getByTestId('list-accounts-action')).not.toThrow()
    expect(() => screen.getByTestId('create-account-action')).not.toThrow()
  })

  test('Should not show create account option if user not has permission', () => {
    const account = mockAccountModel({ roles: ['Writer'] })

    renderSut({ account })

    expect(() => screen.getByTestId('list-accounts-action')).toThrow()
    expect(() => screen.getByTestId('create-account-action')).toThrow()
  })

  test('Should call setCurrentAccount with null', async () => {
    const { setCurrentAccountMock, navigate } = renderSut({})

    await act(async () => {
      const logout = screen.getByTestId('logout')
      fireEvent.click(logout)
      await waitFor(() => logout)
    })

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})
