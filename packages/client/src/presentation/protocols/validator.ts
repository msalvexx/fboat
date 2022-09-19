export type Field = object
export type FieldError = { field: string, message: string }
export type ValidatorResult = undefined | FieldError[]
export type Validator = (field: Field) => ValidatorResult
export type Validation = (validate: any) => Validator
