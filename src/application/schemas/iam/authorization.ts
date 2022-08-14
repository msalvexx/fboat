import builder from 'fluent-json-schema'

export const authorizationHeader = builder
  .object()
  .prop('Authorization', builder.string())
