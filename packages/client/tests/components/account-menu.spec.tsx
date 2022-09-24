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
  test('Should the correct email', () => {
    const account = mockAccountModel()

    renderSut({ account })

    expect(screen.getByTestId('avatar-subtitle')).toContainHTML(account.email)
  })
})
