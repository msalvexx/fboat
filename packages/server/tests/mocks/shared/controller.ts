import { AbstractController } from '@/server/shared/controllers'

export class ControllerSpy extends AbstractController {
  params: any

  override async handle (params: any): Promise<any> {
    this.params = params
    return null
  }
}
