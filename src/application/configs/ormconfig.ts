import { EnvConfig } from './env'
import { DataSource } from 'typeorm'

const dbConfig = EnvConfig.getInstance().configs.db
export default new DataSource({
  type: 'mysql',
  connectTimeout: dbConfig.connectTimeout,
  charset: dbConfig.charset,
  url: dbConfig.connectionString,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  entities: dbConfig.entities,
  migrations: dbConfig.migrations
})
