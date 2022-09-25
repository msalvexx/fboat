import React from 'react'
import { render as reactRender, waitFor } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'
import { MemoryRouter } from 'react-router-dom'
import { mockAccountCredentials, mockAccountModel } from '@/tests/mocks'

import { Account } from '@fboat/core'
import { AccountCredentials } from '@/client/domain/models'
import { currentAccountState } from '@/client/presentation/components'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate
}))

type Params = {
  Page: React.FC
  history: string[]
  accountCredentials?: AccountCredentials
  account?: Account
  states?: Array<{ atom: RecoilState<any>, value: any }>
}

type Result = {
  getCurrentAccountMock: () => Promise<Account>
  setCurrentAccountMock: (account: AccountCredentials) => void
  navigate: jest.Mock
}

const setCurrentAccountMock = jest.fn()
const getCurrentAccountMock = jest.fn()

export const render = async ({ Page, history, accountCredentials = mockAccountCredentials(), account = mockAccountModel(), states = [] }: Params): Promise<Result> => {
  getCurrentAccountMock.mockResolvedValue(account)
  const mockedState = {
    setCurrentAccountCredentials: setCurrentAccountMock,
    getCurrentAccountCredentials: () => accountCredentials,
    getCurrentAccount: getCurrentAccountMock
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

  await waitFor(() => expect(getCurrentAccountMock).toHaveBeenCalled())

  return {
    getCurrentAccountMock,
    setCurrentAccountMock,
    navigate
  }
}
