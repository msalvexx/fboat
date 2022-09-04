import builder from 'fluent-json-schema'
import { authorizationHeader } from '@/shared/infra/gateways/schemas/iam'
import { tags } from './commons'

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
