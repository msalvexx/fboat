import { Entity, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { MySQLUser } from './MySQLUser'

export type AccountParams = {
  accountId: string
  firstName: string
  lastName: string
  occupation: string
  photo: string | null
  birthDate: Date
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

@Entity({ name: 'contas' })
export class MySQLAccount {
  constructor ()
  constructor (params: AccountParams)
  constructor (params?: AccountParams) {
    if (params === undefined) return
    this.accountId = params.accountId
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.occupation = params.occupation
    this.photo = params.photo
    this.birthDate = params.birthDate
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.isActive = params.isActive
  }

  @PrimaryColumn({ name: 'id_conta', type: 'varchar', unique: true })
    accountId!: string

  @OneToOne(() => MySQLUser, user => user.account, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: "id_usuario" })
    user!: MySQLUser

  @Column({ name: 'nome', type: 'varchar' })
    firstName!: string

  @Column({ name: 'sobrenome', type: 'varchar', nullable: true })
    lastName!: string

  @Column({ name: 'profissao', type: 'varchar' })
    occupation!: string

  @Column({ name: 'foto', type: 'varchar' })
    photo!: string | null

  @Column({ name: 'data_nascimento', type: 'varchar', nullable: false })
    birthDate!: Date

  @CreateDateColumn({ name: 'criado_em', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date

  @UpdateDateColumn({ name: 'atualizado_em', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date

  @Column({ name: 'ativo', default: true })
    isActive!: boolean
}
