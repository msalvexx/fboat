import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { MySQLUser } from './MySQLUser'

@Entity({ name: 'contas' })
export class MySQLAccount {
  @PrimaryGeneratedColumn({ name: 'id_int' })
    id!: number

  @Column({ name: 'id_conta', unique: true })
    accountId!: string

  @OneToOne(() => MySQLUser, user => user.account)
  @JoinColumn({ name: "id_int_usuario" })
    user: MySQLUser

  @Column({ name: 'nome' })
    firstName!: string

  @Column({ name: 'sobrenome', nullable: true })
    lastName!: string

  @Column({ name: 'profissao' })
    occupation!: string

  @Column({ name: 'data_nascimento', nullable: false })
    birthDate!: Date

  @Column({ name: 'criado_em' })
    createdAt!: Date

  @Column({ name: 'atualizado_em' })
    updatedAt!: Date

  @Column({ name: 'ativo', default: true })
    isActive!: boolean
}
