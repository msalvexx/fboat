import getenv from 'getenv'
import path from 'path'

export class EnvConfig {
  private static instance: EnvConfig
  readonly configs: any = {
    environment: getenv('APP_ENV', 'dev'),
    isTestEnvironment: ['test', 'dev'].includes(getenv('APP_ENV', 'dev')),
    db: {
      database: getenv('DB_NAME', 'test'),
      host: getenv('DB_HOST', 'localhost'),
      port: getenv.int('DB_PORT', 3306),
      username: getenv('DB_USER', 'root'),
      password: getenv('DB_PASSWORD', ''),
      entities: ['src/iam/infra/repositories/entities/index.{js,ts}'].map(x => path.resolve(x)),
      migrations: [
        ['test', 'dev'].includes(getenv('APP_ENV', 'dev')) ? 'migrations/**/*.{js,ts}' : 'migrations/production/*.{js,ts}'
      ].map(x => path.resolve(x))
    },
    bcrypt: {
      salt: getenv.int('BCRYPT_SALT', 14)
    },
    jwt: {
      secret: getenv('JWT_SECRET', '9336c65aec7c548318fe66fc15abff6a80d93f42'),
      expiresIn: getenv('JWT_EXPIRES_IN', '6h')
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
