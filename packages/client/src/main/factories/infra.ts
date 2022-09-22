import { HttpClient, Storage } from '@/client/domain/protocols'
import { AxiosHttpClient, LocalStorageAdapter } from '@/client/infra'

export const makeAxiosHttpClient = (): HttpClient => new AxiosHttpClient()

export const makeLocalStorageAdapter = (): Storage => new LocalStorageAdapter()
