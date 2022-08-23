import { Handler } from '@/shared/protocols/middleware'

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler

  public setNext (handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  async handle (params: any): Promise<any> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(params)
    }
    return null
  }
}
