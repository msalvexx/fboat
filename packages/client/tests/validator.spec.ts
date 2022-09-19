import Ajv, { ValidateFunction } from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

import { loginBodySchema } from '@/core/iam/schemas'

type Field = object
type FieldError = { field: string, message: string }
type ValidatorResult = undefined | FieldError[]
type Validator = (field: Field) => ValidatorResult
type Validation = (validate: ValidateFunction<unknown>) => Validator

const validate: Validation = (ajvValidate: ValidateFunction<unknown>) => fields => {
  ajvValidate(fields)
  if (!ajvValidate.errors) return undefined
  const messages = ajvValidate.errors
    .filter(error => error.keyword === 'errorMessage')
    .map(error => {
      const keyword = error.params.errors[0].keyword
      const message = error.message ?? ''
      return { keyword, message }
    })
  return ajvValidate.errors
    .filter(error => error.keyword !== 'errorMessage')
    .map(error => {
      const params = error.params
      const keyword = error.keyword
      const message = messages.find(x => x.keyword === keyword)?.message ?? ''
      switch (keyword) {
        case 'format':
          return { field: params.format, message }
        default:
          return { field: params.missingProperty, message }
      }
    })
}

const setupSchemaValidator = (schema: any): Validator => {
  const ajv = new Ajv({ allErrors: true })
  addFormats(ajv)
  addErrors(ajv, { keepErrors: true })
  const errorMessage = {
    required: 'Este é um campo obrigatório',
    properties: {
      email: 'Este e-mail é inválido'
    }
  }
  schema = { ...schema.valueOf(), errorMessage }
  return validate(ajv.compile(schema))
}

describe('Validator', () => {
  test('Will return error case field required field is not provided', () => {
    const validate = setupSchemaValidator(loginBodySchema)

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
    const validate = setupSchemaValidator(loginBodySchema)

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
    const validate = setupSchemaValidator(loginBodySchema)

    const result = validate({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(result).toBeUndefined()
  })
})
