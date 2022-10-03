import { AbstractController } from '@/server/shared/controllers'

export class ControllerSpy extends AbstractController {
  params: any
  result: any = {
    body: 'any body',
    statusCode: 200
  }

  override async handle (params: any): Promise<any> {
    this.params = params
    return this.result
  }
}
