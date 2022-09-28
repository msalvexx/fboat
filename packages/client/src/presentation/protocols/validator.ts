export type Fields = object

export type FieldError = { field: string, message: string }
export namespace Validator {
  export type Result = undefined | FieldError[]
}
export type Validator = (field: Fields) => Validator.Result
export type Validation = (validate: any) => Validator
