import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm'
import { AccountParams, MySQLAccount } from './MySQLAccount'

export type UserParams = {
  userId: string
  email: string
  password: string
  roles: string
  account: AccountParams
}

@Entity({ name: 'usuarios' })
export class MySQLUser {
  constructor ()
  constructor (params: UserParams)
  constructor (params?: UserParams) {
    if (params === undefined) return
    this.userId = params.userId
    this.email = params.email
    this.password = params.password
    this.roles = params.roles
    this.account = new MySQLAccount(params.account)
  }

  @PrimaryColumn({ name: 'id_usuario', type: 'varchar', unique: true, nullable: false })
    userId!: string

  @Column({ name: 'email', type: 'varchar', unique: true, nullable: false })
    email!: string

  @Column({ name: 'senha', type: 'varchar' })
    password!: string

  @Column({ name: 'funcoes', type: 'varchar', nullable: true, default: '' })
    roles!: string

  @OneToOne(() => MySQLAccount, account => account.user, { eager: true })
    account!: MySQLAccount
}
