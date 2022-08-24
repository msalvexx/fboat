import { Entity, Column, PrimaryColumn } from 'typeorm'

export type AccountParams = {
  accountId: string
  firstName: string
  lastName: string
  occupation: string
  photo: string | null
}

@Entity({ name: 'contas' })
export class MySQLAuthor {
  constructor ()
  constructor (params: AccountParams)
  constructor (params?: AccountParams) {
    if (params === undefined) return
    this.accountId = params.accountId
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.occupation = params.occupation
    this.photo = params.photo
  }

  @PrimaryColumn({ name: 'id_conta', type: 'varchar', unique: true })
    accountId!: string

  @Column({ name: 'nome', type: 'varchar' })
    firstName!: string

  @Column({ name: 'sobrenome', type: 'varchar', nullable: true })
    lastName!: string

  @Column({ name: 'profissao', type: 'varchar' })
    occupation!: string

  @Column({ name: 'foto', type: 'varchar' })
    photo!: string | null
}
