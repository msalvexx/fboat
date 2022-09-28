import React from 'react'
import { screen } from '@testing-library/react'
import { render, simulateSubmit, testStatusForField } from '@/tests/helpers'

import { EditArticle } from '@/client/presentation/pages'
import { faker } from '@faker-js/faker'

type SutParams = {
  validatorMock?: jest.Mock
}

const renderSut = ({ validatorMock = jest.fn() }: SutParams = {}): void => {
  render({ Page: () => <EditArticle validator={validatorMock} />, history: ['/'] })
}

describe('Edit Article Page', () => {
  test('Will present correct initial state', () => {
    renderSut()

    expect(screen.getByTestId('title')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('description')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('content')).toHaveAttribute('data-status', 'valid')
    expect(screen.getByTestId('coverPhoto')).toHaveAttribute('data-status', 'valid')
  })

  test('Should show title error if validation fails', async () => {
    const message = faker.random.word()
    const validatorMock = jest.fn(() => [{ field: 'title', message }])
    renderSut({ validatorMock })

    await simulateSubmit()

    testStatusForField('title', message)
  })
})
