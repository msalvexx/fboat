import { MySQLAccountRepository } from '@/iam/infra/repositories'
import { MySQLConnectionManager } from '@/shared/infra'
import { Configs } from '@/application/configs/env'

export const startDbConnection = async (): Promise<void> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect(Configs.db)
}

export const stopDbConnection = async (): Promise<void> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.disconnect()
}

export const makeAccountRepository = (): MySQLAccountRepository => new MySQLAccountRepository()
