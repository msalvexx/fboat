import { HashComparer } from '@/iam/domain/protocols'

export class HashComparerMock implements HashComparer {
  result: boolean = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return this.result
  }
}
