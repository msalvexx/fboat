import { Permission } from '@fboat/core'
import { Controller } from '@/server/shared/protocols/controller'
import { AccountToAuthorMapperController, AuthorizationController, MethodHandler, ServiceHandlerController, TokenCertifierController, FileUploadController, HideUnpublishedArticleController, PrivateServiceController } from '@/server/shared/controllers'

import { makeAuthenticationService } from '@/server/main/factories'

export class ControllerBuilder {
  private instance: Controller
  private next: Controller
  private statusCode: number = 200

  private constructor (private readonly context: Object) {}

  static of (service: Object): ControllerBuilder {
    return new ControllerBuilder(service)
  }

  service (method: MethodHandler): Controller {
    this.addHandler(new ServiceHandlerController(method, this.context, this.statusCode))
    return this.instance
  }

  tokenCertifier (): ControllerBuilder {
    this.addHandler(new TokenCertifierController(makeAuthenticationService()))
    return this
  }

  privateService (): ControllerBuilder {
    this.addHandler(new PrivateServiceController())
    return this
  }

  authorization (permission: Permission): ControllerBuilder {
    this.addHandler(new AuthorizationController(permission))
    return this
  }

  fileUpload (): ControllerBuilder {
    this.addHandler(new FileUploadController())
    return this
  }

  accountToAuthor (): ControllerBuilder {
    this.addHandler(new AccountToAuthorMapperController())
    return this
  }

  hideUnpublishedArticle (): ControllerBuilder {
    this.addHandler(new HideUnpublishedArticleController())
    return this
  }

  onSuccess (statusCode: number): ControllerBuilder {
    this.statusCode = statusCode
    return this
  }

  private addHandler (handler: Controller): void {
    if (this.instance === undefined) this.instance = handler
    else this.next.setNext(handler)
    this.next = handler
  }
}
