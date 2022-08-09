import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { MySQLAccount } from './MySQLAccount'

@Entity({ name: 'usuarios' })
export class MySQLUser {
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
