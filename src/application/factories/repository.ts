import { MySQLAccountRepository } from '@/iam/infra/repositories'
import { MySQLConnectionManager } from '@/shared/infra'
import { EnvConfig } from '@/application/configs/env'

export const startDbConnection = async (config: any = null): Promise<MySQLConnectionManager> => {
  if (config !== undefined) EnvConfig.getInstance().changeDbConfig(config)
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect()
  return connectionManager
}

export const stopDbConnection = async (): Promise<void> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.disconnect()
}

export const makeAccountRepository = (): MySQLAccountRepository => new MySQLAccountRepository()
