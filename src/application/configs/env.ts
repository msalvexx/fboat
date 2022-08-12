import getenv from 'getenv'
import path from 'path'

export const Configs = {
  db: {
    database: getenv('DB_NAME'),
    host: getenv('DB_HOST'),
    port: parseInt(getenv('DB_PORT')),
    username: getenv('DB_USER'),
    password: getenv('DB_PASSWORD'),
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
    port: parseInt(getenv('SERVER_PORT')) ?? 3000
  }
}
