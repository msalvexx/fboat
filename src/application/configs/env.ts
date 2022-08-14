import getenv from 'getenv'
import path from 'path'

export class EnvConfig {
  private static instance: EnvConfig
  readonly configs: any = {
    db: {
      database: getenv('DB_NAME', 'test'),
      host: getenv('DB_HOST', 'localhost'),
      port: getenv.int('DB_PORT', 3306),
      username: getenv('DB_USER', 'test'),
      password: getenv('DB_PASSWORD', ''),
      entities: [path.resolve('src/iam/infra/repositories/entities/index.{js,ts}')],
      migrations: [path.resolve('migrations/*.{js,ts}')]
    },
    bcrypt: {
      salt: 14
    },
    jwt: {
      secret: '9336c65aec7c548318fe66fc15abff6a80d93f42'
    },
    server: {
      port: getenv.int('SERVER_PORT', 3000)
    }
  }

  private constructor () {}

  static getInstance (): EnvConfig {
    if (this.instance === undefined) this.instance = new EnvConfig()
    return this.instance
  }

  changeDbConfig (db: any): void {
    this.configs.db.database = db.database
    this.configs.db.host = db.host
    this.configs.db.port = db.port
    this.configs.db.username = db.username
    this.configs.db.password = db.password
  }
}
