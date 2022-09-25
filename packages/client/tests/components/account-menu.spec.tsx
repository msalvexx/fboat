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
  getCurrentAccountMock: () => Promise<Account>
  setCurrentAccountMock: (account: AccountCredentials) => void
  navigate: jest.Mock
}

const renderSut = async ({ account, accountCredentials }: SutParams): Promise<SutTypes> => {
  const { setCurrentAccountMock, navigate, getCurrentAccountMock } = await render({
    Page: () => <AccountMenu />,
    history: ['/'],
    account,
    accountCredentials
  })
  return { setCurrentAccountMock, navigate, getCurrentAccountMock }
}

describe('Account Menu', () => {
  test('Should present the correct email', async () => {
    const accountCredentials = mockAccountCredentials()

    await renderSut({ accountCredentials })

    expect(screen.getByTestId('avatar-subtitle')).toContainHTML(accountCredentials.email)
  })

  test('Should present the correct name', async () => {
    const accountCredentials = mockAccountCredentials()

    await renderSut({ accountCredentials })

    expect(screen.getByTestId('avatar-title')).toContainHTML(accountCredentials.name)
  })

  test('Should present the correct photo', async () => {
    const accountCredentials = mockAccountCredentials()

    await renderSut({ accountCredentials })

    expect(screen.getByTestId('avatar-photo')).toHaveAttribute('src', accountCredentials.avatar)
  })

  test('Should show admin options if user has permission', async () => {
    const account = mockAccountModel({ roles: ['Administrator'] })

    await renderSut({ account })

    expect(() => screen.getByTestId('list-accounts-action')).not.toThrow()
    expect(() => screen.getByTestId('create-account-action')).not.toThrow()
  })

  test('Should not show create account option if user not has permission', async () => {
    const account = mockAccountModel({ roles: ['Writer'] })

    await renderSut({ account })

    expect(() => screen.getByTestId('list-accounts-action')).toThrow()
    expect(() => screen.getByTestId('create-account-action')).toThrow()
  })

  test('Should call setCurrentAccount with null', async () => {
    const { setCurrentAccountMock, navigate } = await renderSut({})

    await act(async () => {
      const logout = screen.getByTestId('logout')
      fireEvent.click(logout)
      await waitFor(() => logout)
    })

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})
