import { Validator } from '@/client/presentation/protocols'
import { validate, customErrorMessages as errorMessage } from '@/client/infra'

import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

export const setupValidator = (schema: any): Validator => {
  const ajv = new Ajv({ allErrors: true })
  addFormats(ajv)
  addErrors(ajv, { keepErrors: true })
  schema = { ...schema.valueOf(), errorMessage }
  return validate(ajv.compile(schema))
}
