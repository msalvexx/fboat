import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { MySQLUser } from './MySQLUser'

@Entity({ name: 'contas' })
export class MySQLAccount {
  @PrimaryGeneratedColumn({ name: 'id_int' })
    id!: number

  @Column({ name: 'id_conta', unique: true })
    accountId!: string

  @OneToOne(() => MySQLUser, user => user.account, { cascade: ['insert', 'update'] })
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

  @CreateDateColumn({ name: 'criado_em', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date

  @UpdateDateColumn({ name: 'atualizado_em', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date

  @Column({ name: 'ativo', default: true })
    isActive!: boolean
}
