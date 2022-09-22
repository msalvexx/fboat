import React from 'react'
import { render as reactRender } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'
import { MemoryRouter } from 'react-router-dom'
import { mockAccountModel } from '@/tests/mocks'

import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { currentAccountState } from '@/client/presentation/components'

type Params = {
  Page: React.FC
  history: string[]
  account?: AuthenticateUser.Result
  states?: Array<{ atom: RecoilState<any>, value: any }>
}

type Result = {
  setCurrentAccountMock: (account: AuthenticateUser.Result) => void
}

const setCurrentAccountMock = jest.fn()

export const render = ({ Page, history, account = mockAccountModel(), states = [] }: Params): Result => {
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
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
