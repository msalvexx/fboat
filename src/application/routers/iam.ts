import { FastifyInstance, RouteOptions } from 'fastify'
import { makeAccountService } from '@/application/factories/services'
import { fastifyHandler } from '@/application/adapters'
import { changeAccountSchema, changePasswordSchema, createAccountSchema, getAccountSchema } from '@/application/schemas/iam'

const accountService = makeAccountService()

export default async function (router: FastifyInstance, _: RouteOptions): Promise<void> {
  router.post('/account', { schema: createAccountSchema }, fastifyHandler(accountService.createAccount))
  router.get('/account', { schema: getAccountSchema }, fastifyHandler(accountService.getAccount))
  router.put('/account', { schema: changeAccountSchema }, fastifyHandler(accountService.changeAccount))
  router.put('/account/password', { schema: changePasswordSchema }, fastifyHandler(accountService.changePassword))
}
