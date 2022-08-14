import { EnvConfig } from '@/application/configs/env'
import { ConnectionNotFoundError, TransactionNotFoundError } from '@/iam'
import { DataSource, QueryRunner, ObjectType, Repository } from 'typeorm'

export namespace MySQLConnectionManager {
  export type Config = {
    connectionString?: string | undefined
    connectTimeout?: number | number
    charset?: string | undefined
    host?: string | undefined
    port?: number
    database?: string | undefined
    username?: string | undefined
    password?: string | undefined
    entities?: string[]
    migrations?: string[]
  }
}

export class MySQLConnectionManager {
  private static instance?: MySQLConnectionManager
  private connection?: DataSource
  private query?: QueryRunner
  private readonly config: MySQLConnectionManager.Config

  private constructor () {
    this.config = EnvConfig.getInstance().configs.db
  }

  static getInstance (): MySQLConnectionManager {
    if (this.instance === undefined) {
      this.instance = new MySQLConnectionManager()
    }
    return this.instance
  }

  async connect (): Promise<void> {
    if (await this.isConnected()) return
    const config: any = {
      type: 'mysql',
      url: this.config.connectionString,
      connectTimeout: this.config.connectTimeout,
      charset: this.config.charset,
      database: this.config.database,
      host: this.config.host,
      port: this.config.port,
      username: this.config.username,
      password: this.config.password,
      entities: this.config.entities,
      migrations: this.config.migrations
    }
    const datasource = new DataSource(config)
    this.connection = await datasource.initialize()
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

  async runMigrations (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    await this.connection.runMigrations()
  }

  async truncateEntities (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    const entities = this.connection.entityMetadatas
    await this.connection.query('SET foreign_key_checks = 0')
    for (const entity of entities) {
      const repository = this.connection.getRepository(entity.name)
      await repository.clear()
    }
    await this.connection.query('SET foreign_key_checks = 1')
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    if (this.query !== undefined) return this.query.manager.getRepository(entity)
    return this.connection.getRepository(entity)
  }

  async executeQuery (sql: string): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    await this.connection?.query(sql)
  }
}
