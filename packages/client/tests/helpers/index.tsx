import React from 'react'
import { render as reactRender } from '@testing-library/react'
import { RecoilRoot } from 'recoil'

export const render = (Page: React.FC): void => {
  reactRender(
    <RecoilRoot>
      <Page/>
    </RecoilRoot>
  )
}

export * from './form'
