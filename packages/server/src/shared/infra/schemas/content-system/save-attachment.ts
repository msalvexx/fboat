import builder from 'fluent-json-schema'
import { authorizationHeader } from '@/server/shared/infra/schemas/iam'
import { tags } from './commons'

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
