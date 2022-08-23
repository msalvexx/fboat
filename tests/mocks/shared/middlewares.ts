import { AbstractHandler } from '@/shared/middlewares'

export class HandlerSpy extends AbstractHandler {
  params: any

  override async handle (params: any): Promise<any> {
    this.params = params
    return null
  }
}
