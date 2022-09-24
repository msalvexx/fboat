import React from 'react'
import { render as reactRender } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'
import { MemoryRouter } from 'react-router-dom'
import { mockAccountCredentials, mockAccountModel } from '@/tests/mocks'

import { Account } from '@fboat/core'
import { AccountCredentials } from '@/client/domain/models'
import { currentAccountState } from '@/client/presentation/components'

type Params = {
  Page: React.FC
  history: string[]
  accountCredentials?: AccountCredentials
  account?: Account
  states?: Array<{ atom: RecoilState<any>, value: any }>
}

type Result = {
  setCurrentAccountMock: (account: AccountCredentials) => void
}

const setCurrentAccountMock = jest.fn()

export const render = ({ Page, history, accountCredentials = mockAccountCredentials(), account = mockAccountModel(), states = [] }: Params): Result => {
  const mockedState = {
    setCurrentAccountCredentials: setCurrentAccountMock,
    getCurrentAccountCredentials: () => accountCredentials,
    getCurrentAccount: () => account
  }
  const initializeState = ({ set }: MutableSnapshot): void => {
    [...states, { atom: currentAccountState, value: mockedState }].forEach(state => set(state.atom, state.value))
  }
  reactRender(
    <RecoilRoot initializeState={initializeState}>
      <MemoryRouter initialEntries={history}>
        <Page/>
      </MemoryRouter>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}
