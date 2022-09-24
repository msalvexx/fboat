import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockAccountCredentials } from '@/tests/mocks'

import { Account } from '@fboat/core'
import { AccountCredentials } from '@/client/domain'
import { AccountMenu } from '@/client/presentation/components'

type SutParams = {
  account?: Account
  accountCredentials?: AccountCredentials
}

const renderSut = ({ account, accountCredentials }: SutParams): void => {
  render({
    Page: () => <AccountMenu />,
    history: ['/'],
    account,
    accountCredentials
  })
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
})
