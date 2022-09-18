import { authorizationHeader } from '@/core/iam/schemas'
import { tags } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
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
  body: bodySchema,
  headers: authorizationHeader,
  tags
}
