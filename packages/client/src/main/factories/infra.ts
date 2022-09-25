import { HttpClient, Storage } from '@/client/domain/protocols'
import { AxiosHttpClient, LocalStorageAdapter } from '@/client/infra'

export const makeAxiosHttpClient = <T>(): HttpClient => new AxiosHttpClient<T>()

export const makeLocalStorageAdapter = (): Storage => new LocalStorageAdapter()
