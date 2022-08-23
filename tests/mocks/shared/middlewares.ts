import { AbstractHandler } from '@/shared/handlers'

export class HandlerSpy extends AbstractHandler {
  params: any

  override async handle (params: any): Promise<any> {
    this.params = params
    return null
  }
}
