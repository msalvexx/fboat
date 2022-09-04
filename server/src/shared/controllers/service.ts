import { AbstractController } from './controller'

export type MethodHandler = (params: any) => Promise<any>

export class ServiceHandlerController extends AbstractController {
  constructor (
    private readonly method: MethodHandler,
    private readonly instance: Object,
    private readonly statusCode: number
  ) {
    super()
    this.method = method.bind(this.instance)
  }

  override async handle (params: any): Promise<any> {
    const result = await this.method(params)
    return {
      body: result,
      statusCode: this.statusCode
    }
  }
}
