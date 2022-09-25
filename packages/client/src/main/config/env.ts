/* eslint-disable @typescript-eslint/no-empty-function */
export class EnvConfig {
  private static instance: EnvConfig
  readonly configs: any = {
    jwt: {
      secret: process.env.JWT_SECRET ?? '9336c65aec7c548318fe66fc15abff6a80d93f42'
    }
  }

  private constructor () { }

  static getInstance (): EnvConfig {
    if (this.instance === undefined) this.instance = new EnvConfig()
    return this.instance
  }
}
