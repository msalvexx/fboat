import { HashComparer, HashGenerator } from '@/server/iam/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer, HashGenerator {
  constructor (private readonly salt: number) {}

  async generate (rawText: string): Promise<string> {
    return await bcrypt.hash(rawText, this.salt)
  }

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }
}
