import { AbstractHandler } from './handler'

export type MethodHandler = (params: any) => Promise<any>

export class ServiceHandler extends AbstractHandler {
  constructor (private readonly method: MethodHandler, private readonly instance: Object) {
    super()
    this.method = method.bind(this.instance)
  }

  override async handle (params: any): Promise<any> {
    return await this.method(params)
  }
}
