import { authorizationHeader } from '../../iam/schemas'
import { tags } from './commons'

import builder from 'fluent-json-schema'

const params = builder
  .object()
  .description('attachment filename to remove')
  .prop('fileName', builder.string().format('uuid').required())

export const removeAttachmentSchema = {
  description: 'Remove attachment schema',
  params,
  headers: authorizationHeader,
  tags
}
