import { Controller } from '@/server/shared/protocols/controller'

export abstract class AbstractController implements Controller {
  private nextController: Controller

  public setNext (controller: Controller): Controller {
    this.nextController = controller
    return controller
  }

  async handle (params: Controller.Params): Promise<Controller.Result> {
    if (this.nextController) {
      return await this.nextController.handle(params)
    }
    return null as any
  }
}
