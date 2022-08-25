import { Permission } from '@/iam/domain/model'
import { Handler } from '@/shared/domain/protocols/middleware'
import { AccountToAuthorMapperHandler, AuthorizationHandler, MethodHandler, ServiceHandler, TokenCertifierHandler, FileUploadHandler } from '@/shared/handlers'

import { makeAuthenticationService } from '@/main/factories'

export class HandlerBuilder {
  private instance: Handler
  private next: Handler

  private constructor (private readonly context: Object) {}

  static of (service: Object): HandlerBuilder {
    return new HandlerBuilder(service)
  }

  service (method: MethodHandler): Handler {
    this.addHandler(new ServiceHandler(method, this.context))
    return this.instance
  }

  tokenCertifier (): HandlerBuilder {
    this.addHandler(new TokenCertifierHandler(makeAuthenticationService()))
    return this
  }

  authorization (permission: Permission): HandlerBuilder {
    this.addHandler(new AuthorizationHandler(permission))
    return this
  }

  fileUpload (): HandlerBuilder {
    this.addHandler(new FileUploadHandler())
    return this
  }

  accountToAuthor (): HandlerBuilder {
    this.addHandler(new AccountToAuthorMapperHandler())
    return this
  }

  private addHandler (handler: Handler): void {
    if (this.instance === undefined) this.instance = handler
    else this.next.setNext(handler)
    this.next = handler
  }
}
