import React from 'react'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockAccountCredentials } from '@/tests/mocks'

import { AccountCredentials } from '@/client/domain'
import { AccountMenu } from '@/client/presentation/components'

type SutTypes = {
  setCurrentAccountMock: (accountCredentials: AccountCredentials) => void
  navigate: jest.Mock
  accountCredentials: AccountCredentials
}

const renderSut = (hasPermissionMock = jest.fn()): SutTypes => {
  const accountCredentials = mockAccountCredentials()
  const { setCurrentAccountMock, navigate } = render({
    Page: () => <AccountMenu />,
    history: ['/'],
    accountCredentials,
    hasPermissionMock
  })
  return { setCurrentAccountMock, navigate, accountCredentials }
}

describe('Account Menu', () => {
  const hasPermissionMock = jest.fn()

  test('Should present the correct email', () => {
    const { accountCredentials } = renderSut()

    expect(screen.getByTestId('avatar-subtitle')).toContainHTML(accountCredentials.email)
  })

  test('Should present the correct name', () => {
    const { accountCredentials } = renderSut()

    expect(screen.getByTestId('avatar-title')).toContainHTML(accountCredentials.name)
  })

  test('Should present the correct photo', () => {
    const { accountCredentials } = renderSut()

    expect(screen.getByTestId('avatar-photo')).toHaveAttribute('src', accountCredentials.avatar)
  })

  test('Should show admin options if user has permission', () => {
    hasPermissionMock.mockReturnValue(true)

    renderSut(hasPermissionMock)

    expect(() => screen.getByTestId('list-accounts-action')).not.toThrow()
    expect(() => screen.getByTestId('create-account-action')).not.toThrow()
  })

  test('Should not show create account option if user not has permission', () => {
    hasPermissionMock.mockReturnValue(false)

    renderSut(hasPermissionMock)

    expect(() => screen.getByTestId('list-accounts-action')).toThrow()
    expect(() => screen.getByTestId('create-account-action')).toThrow()
  })

  test('Should call setCurrentAccount with null', async () => {
    const { setCurrentAccountMock, navigate } = renderSut()

    await act(async () => {
      const logout = screen.getByTestId('logout')
      fireEvent.click(logout)
      await waitFor(() => logout)
    })

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})
