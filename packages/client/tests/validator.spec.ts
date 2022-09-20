import { setupValidator as sut } from '@/client/main/factories'

import { loginBodySchema } from '@fboat/core/iam/schemas'

describe('Validator', () => {
  test('Will fail case required field was not provided', () => {
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

  test('Will fail case field is invalid', () => {
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

  test('Will fail if values are empty', () => {
    const validate = sut(loginBodySchema)

    const result = validate({
      email: '',
      password: ''
    })

    const expectations = [{
      field: 'email',
      message: 'Este é um campo obrigatório'
    }, {
      field: 'password',
      message: 'Este é um campo obrigatório'
    }]
    expect(result).toEqual(expect.arrayContaining(expectations))
  })

  test('Will fail if values are null', () => {
    const validate = sut(loginBodySchema)

    const result = validate({
      email: null,
      password: null
    })

    const expectations = [{
      field: 'email',
      message: 'Este é um campo obrigatório'
    }, {
      field: 'password',
      message: 'Este é um campo obrigatório'
    }]
    expect(result).toEqual(expect.arrayContaining(expectations))
  })

  test('Will fail if values are undefined', () => {
    const validate = sut(loginBodySchema)

    const result = validate({
      email: undefined,
      password: undefined
    })

    const expectations = [{
      field: 'email',
      message: 'Este é um campo obrigatório'
    }, {
      field: 'password',
      message: 'Este é um campo obrigatório'
    }]
    expect(result).toEqual(expect.arrayContaining(expectations))
  })
})
