import { Hasher } from '@/server/iam/protocols'

export class HasherMock implements Hasher {
  compareResult: boolean = true
  generateResult: string = 'hashedPassword'

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return this.compareResult
  }

  async generate (params: string): Promise<string> {
    return this.generateResult
  }
}
