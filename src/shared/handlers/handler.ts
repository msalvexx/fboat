import { Handler } from '@/shared/domain/protocols/handler'

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler

  public setNext (handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  async handle (params: Handler.Params): Promise<Handler.Result> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(params)
    }
    return null as any
  }
}
