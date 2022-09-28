import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/tests/helpers'

import { EditArticle } from '@/client/presentation/pages'

describe('Edit Article Page', () => {
  beforeEach(() => {
    render({ Page: () => <EditArticle />, history: ['/'] })
  })

  test('Will present correct initial state', () => {
    expect(screen.getByTestId('title')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('description')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('content')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('coverPhoto')).toHaveAttribute('data-status', 'valid')
  })
})
