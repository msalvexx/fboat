import { ConnectionNotFoundError, TransactionNotFoundError } from '@/iam'
import { DataSource, QueryRunner, ObjectType, Repository } from 'typeorm'

export namespace MySQLTransactionManager {
  export type Config = {
    connectionString?: string | undefined
    connectTimeout?: number | number
    charset?: string | undefined
    host?: string | undefined
    port?: number
    database?: string | undefined
    username?: string | undefined
    password?: string | undefined
  }
}

export class MySQLTransactionManager {
  private static instance?: MySQLTransactionManager
  private readonly defaultConfig: MySQLTransactionManager.Config = {
    host: 'localhost',
    port: 3306,
    username: 'dev',
    password: '1234',
    database: 'test'
  }

  private connection?: DataSource
  private query?: QueryRunner

  private constructor () {}

  static getInstance (): MySQLTransactionManager {
    if (this.instance === undefined) {
      this.instance = new MySQLTransactionManager()
    }
    return this.instance
  }

  async connect (config: MySQLTransactionManager.Config = this.defaultConfig): Promise<void> {
    const datasource = new DataSource({
      type: 'mysql',
      url: config.connectionString,
      connectTimeout: config.connectTimeout,
      charset: config.charset,
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      password: config.password
    })
    if (!await this.isConnected()) this.connection = await datasource.initialize()
  }

  async isConnected (): Promise<boolean> {
    return this.connection?.isInitialized ?? false
  }

  async disconnect (): Promise<void> {
    await this.connection?.destroy()
    this.connection = undefined
    this.query = undefined
  }

  async startTransaction (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    this.query = this.connection.createQueryRunner()
    await this.query.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError()
    await this.query.release()
  }

  async commit (): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError()
    await this.query.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError()
    await this.query.rollbackTransaction()
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    if (this.query !== undefined) return this.query.manager.getRepository(entity)
    return this.connection.getRepository(entity)
  }
}
