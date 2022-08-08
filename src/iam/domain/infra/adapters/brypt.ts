import { HashComparer, HashGenerator } from '@/iam/domain/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer, HashGenerator {
  constructor (private readonly salt: number) {}

  async generateHash (rawText: string): Promise<string> {
    return await bcrypt.hash(rawText, this.salt)
  }

  async compareHash (plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }
}
