import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockAccountModel } from '@/tests/mocks'

import { Account } from '@/client/domain/models'
import { AccountMenu } from '@/client/presentation/components'

type SutParams = {
  account?: Account
}

const renderSut = ({ account }: SutParams): void => {
  render({
    Page: () => <AccountMenu account={account}/>,
    history: ['/'],
    account
  })
}

describe('Account Menu', () => {
  test('Should present the correct email', () => {
    const account = mockAccountModel()

    renderSut({ account })

    expect(screen.getByTestId('avatar-subtitle')).toContainHTML(account.email)
  })

  test('Should present the correct name', () => {
    const account = mockAccountModel()

    renderSut({ account })

    expect(screen.getByTestId('avatar-title')).toContainHTML(account.name)
  })

  test('Should present the correct photo', () => {
    const account = mockAccountModel()

    renderSut({ account })

    expect(screen.getByTestId('avatar-photo')).toHaveAttribute('src', account.avatar)
  })
})
