import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { AccountParams, MySQLAccount } from './MySQLAccount'

export type UserParams = {
  id: number
  userId: string
  email: string
  password: string
  account: AccountParams
}

@Entity({ name: 'usuarios' })
export class MySQLUser {
  constructor ()
  constructor (params: UserParams)
  constructor (params?: UserParams) {
    if (params === undefined) return
    this.id = params.id
    this.userId = params.userId
    this.email = params.email
    this.password = params.password
    this.account = new MySQLAccount(params.account)
  }

  @PrimaryGeneratedColumn({ name: 'id_int' })
    id!: number

  @Column({ name: 'id_usuario', unique: true })
    userId!: string

  @Column({ name: 'email', unique: true })
    email!: string

  @Column({ name: 'senha' })
    password!: string

  @OneToOne(() => MySQLAccount, account => account.user, { eager: true })
    account!: MySQLAccount
}
