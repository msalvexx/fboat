import { setupValidator as sut } from '@/client/main/factories'

import { loginBodySchema } from '@fboat/core/src/iam/schemas'

describe('Validator', () => {
  test('Will return error case field required field is not provided', () => {
    const validate = sut(loginBodySchema)

    const result = validate({})

    const expectations = [{
      field: 'email',
      message: 'Este é um campo obrigatório'
    }, {
      field: 'password',
      message: 'Este é um campo obrigatório'
    }]
    expect(result).toEqual(expect.arrayContaining(expectations))
  })

  test('Will return error case field is invalid', () => {
    const validate = sut(loginBodySchema)

    const result = validate({
      email: 'invalid_email',
      password: 'any_password'
    })

    const expectations = [{
      field: 'email',
      message: 'Este e-mail é inválido'
    }]
    expect(result).toEqual(expect.arrayContaining(expectations))
  })

  test('Will return undefined when validated successfully', () => {
    const validate = sut(loginBodySchema)

    const result = validate({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(result).toBeUndefined()
  })
})
