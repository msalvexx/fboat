import { Validator } from '@/client/presentation/protocols'
import { validate } from '@/client/infra'

import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

export const setupValidator = (schema: any): Validator => {
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
