import { HttpClient, Storage, TokenVerifier } from '@/client/domain/protocols'
import { AxiosHttpClient, LocalStorageAdapter, JwtAdapter } from '@/client/infra'
import { EnvConfig } from '@/client/main/config/env'

export const makeAxiosHttpClient = <T>(): HttpClient => new AxiosHttpClient<T>()

export const makeLocalStorageAdapter = (): Storage => new LocalStorageAdapter()

export const makeJwtDecrypter = (): TokenVerifier => new JwtAdapter(EnvConfig.getInstance().configs.jwt.secret)
