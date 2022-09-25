import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/tests/helpers'
import { mockAccountCredentials, mockAccountModel } from '@/tests/mocks'

import { AccountCredentials } from '@/client/domain/models'
import { Header } from '@/client/presentation/components'

type SutParams = {
  accountCredentials?: AccountCredentials
  hidePrimaryAction?: boolean
}
const defaultSut = { account: mockAccountModel(), hidePrimaryAction: false }
const renderSut = async ({ accountCredentials = mockAccountCredentials(), hidePrimaryAction = false }: SutParams = defaultSut): Promise<void> => {
  await render({
    Page: () => <Header buttonHidden={hidePrimaryAction}/>,
    history: ['/'],
    accountCredentials
  })
}

describe('Header Component', () => {
  test('Should not show account menu when no account is logged', async () => {
    const accountCredentials = null
    await renderSut({ accountCredentials })

    expect(() => screen.getByTestId('account-menu')).toThrow()
    expect(() => screen.getByTestId('login-action')).not.toThrow()
  })

  test('Should show account menu when account is logged', async () => {
    await renderSut()

    expect(() => screen.getByTestId('account-menu')).not.toThrow()
    expect(() => screen.getByTestId('new-article-action')).not.toThrow()
    expect(() => screen.getByTestId('login-action')).toThrow()
  })

  test('Should not show any button action', async () => {
    await renderSut({ hidePrimaryAction: true })

    expect(screen.getByTestId('primary-action-wrapper')).not.toBeVisible()
  })
})
