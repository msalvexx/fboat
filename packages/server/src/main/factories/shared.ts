import { MySQLConnectionManager } from '@/server/shared/infra'

export const startDbConnection = async (config: any = null): Promise<MySQLConnectionManager> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect(config)
  return connectionManager
}
export const stopDbConnection = async (): Promise<void> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.disconnect()
}
