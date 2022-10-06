import getenv from 'getenv'
import path, { resolve } from 'path'

export class EnvConfig {
  private static instance: EnvConfig
  readonly configs: any = {
    environment: getenv('APP_ENV', 'dev'),
    isProduction: ['production', 'prod'].includes(getenv('APP_ENV', 'dev')),
    isTestEnvironment: ['test', 'dev'].includes(getenv('APP_ENV', 'dev')),
    db: {
      database: getenv('DB_NAME', 'test'),
      host: getenv('DB_HOST', 'localhost'),
      port: getenv.int('DB_PORT', 3306),
      username: getenv('DB_USER', 'root'),
      password: getenv('DB_PASSWORD', ''),
      entities: [
        'iam/infra/repositories/entities/index.{js,ts}',
        'content-system/infra/repositories/entities/index.{js,ts}'
      ].map(x => path.resolve(`${getenv('APP_ENV', 'dev') !== 'test' ? 'dist/src' : 'src'}/${x}`)),
      migrations: ['test', 'dev'].includes(getenv('APP_ENV', 'dev')) ? ['migrations/**/*.{js,ts}'].map(x => path.resolve(x)) : []
    },
    bcrypt: {
      salt: getenv.int('BCRYPT_SALT', 14)
    },
    jwt: {
      secret: getenv('JWT_SECRET', '9336c65aec7c548318fe66fc15abff6a80d93f42'),
      expiresIn: getenv('JWT_EXPIRES_IN', '6h')
    },
    server: {
      host: getenv('SERVER_HOST', 'localhost'),
      port: getenv.int('SERVER_PORT', 3000),
      url: `${getenv('SERVER_HOST', 'http://localhost')}:${getenv.int('SERVER_PORT', 3000)}`
    },
    fileUpload: {
      limits: { fileSize: 2 * 1024 * 1024 }
    },
    staticFile: {
      root: resolve('../../../public'),
      prefix: '/public'
    },
    cors: {
      origin: ['test', 'dev'].includes(getenv('APP_ENV', 'dev')) ? '*': getenv('APP_CORS_ORIGIN', '*')
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
