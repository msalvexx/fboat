import React from 'react'
import { render as reactRender } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'
import { MemoryRouter } from 'react-router-dom'
import { mockAccountCredentials } from '@/tests/mocks'

import { Account } from '@fboat/core'
import { AccountCredentials } from '@/client/domain/models'
import { currentAccountState } from '@/client/presentation/components'

const navigate = jest.fn()
const resetState = jest.fn()

jest.mock('uikit', () => ({
  slider: () => undefined
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate
}))

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useResetRecoilState: () => resetState
}))

type Params = {
  Page: React.FC
  history: string[]
  accountCredentials?: AccountCredentials
  account?: Account
  states?: Array<{ atom: RecoilState<any>, value: any }>
  hasPermissionMock?: jest.Mock
}

type Result = {
  setCurrentAccountMock: (account: AccountCredentials) => void
  navigate: jest.Mock
  container: HTMLElement
}

const setCurrentAccountMock = jest.fn()

export const render = ({ Page, history, accountCredentials = mockAccountCredentials(), states = [], hasPermissionMock = jest.fn() }: Params): Result => {
  const mockedState = {
    setCurrentAccountCredentials: setCurrentAccountMock,
    getCurrentAccountCredentials: () => accountCredentials,
    hasPermission: hasPermissionMock
  }
  const initializeState = ({ set }: MutableSnapshot): void => {
    [...states, { atom: currentAccountState, value: mockedState }].forEach(state => set(state.atom, state.value))
  }

  const { container } = reactRender(
    <RecoilRoot initializeState={initializeState}>
      <MemoryRouter initialEntries={history}>
        <Page/>
      </MemoryRouter>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock,
    navigate,
    container
  }
}
