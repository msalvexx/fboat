import { authorizationHeader } from '../../iam/schemas'
import { tags } from './commons'

import builder from 'fluent-json-schema'

export const attachment = builder
  .object()
  .description('Attachment body')
  .prop('file', builder
    .object()
    .prop('data', builder.object())
    .prop('mimetype', builder.enum(['image/png', 'image/jpeg']))
  )
  .required(['file'])

export const saveAttachmentSchema = {
  description: 'Save attachment schema',
  body: attachment,
  headers: authorizationHeader,
  tags
}
