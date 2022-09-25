import { Storage } from '@/client/domain/protocols'

export class LocalStorageAdapter implements Storage {
  set (key: string, value: object | undefined): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
