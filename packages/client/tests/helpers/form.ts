import { faker } from '@faker-js/faker'
import { fireEvent, waitFor, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError = ''): void => {
  const field = screen.getByTestId(fieldName)
  expect(field).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  if (!validationError) {
    expect(() => { screen.getByTestId(`${fieldName}-alert`) }).toThrow()
    return
  }
  const alert = screen.getByTestId(`${fieldName}-alert`)
  expect(alert).toHaveTextContent(validationError)
}

export const simulateSubmit = async (): Promise<void> => {
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

export const populateField = (fieldName: string, value = faker.random.word()): string => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
  return value
}

export const attachFile = (fieldName: string, file = new File([''], `${faker.lorem.word()}.png`, { type: 'image/png' })): File => {
  const input = screen.getByTestId(fieldName)
  fireEvent.change(input, { target: { files: [file] } })
  return file
}
