import builder from 'fluent-json-schema'

export const authorizationHeader = builder
  .object()
  .description('Authorization object')
  .prop('Authorization', builder.string())
