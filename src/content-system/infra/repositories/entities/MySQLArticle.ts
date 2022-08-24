import { MySQLAuthor } from './MySQLAuthor'
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

export type ArticleParams = {
  articleId: string
  accountId: string
  slug: string
  title: string
  summary: string
  content: string
  isFeatured: boolean
  isPublished: boolean
  publishDate: Date
  revisionDate: Date
  creationDate: Date
  photo: string
}

@Entity({ name: 'artigos' })
export class MySQLArticle {
  constructor ()
  constructor (params: ArticleParams)
  constructor (params?: ArticleParams) {
    if (params === undefined) return
    this.articleId = params.articleId
    this.accountId = params.accountId
    this.slug = params.slug
    this.title = params.title
    this.summary = params.summary
    this.content = params.content
    this.isPublished = params.isPublished
    this.isFeatured = params.isFeatured
    this.publishDate = params.publishDate
    this.revisionDate = params.revisionDate
    this.creationDate = params.creationDate
    this.photo = params.photo
  }

  @PrimaryColumn({ name: 'id_artigo', type: 'varchar', unique: true })
    articleId!: string

  @OneToOne(() => MySQLAuthor, { eager: true })
  @JoinColumn({ name: "id_conta" })
    account!: MySQLAuthor

  @Column({ name: 'id_conta', type: 'varchar' })
    accountId!: string

  @Column({ name: 'slug', type: 'varchar', unique: true })
    slug!: string

  @Column({ name: 'titulo', type: 'varchar' })
    title!: string

  @Column({ name: 'resumo', type: 'varchar' })
    summary!: string

  @Column({ name: 'conteudo', type: 'varchar' })
    content!: string

  @Column({ name: 'destacado', default: false })
    isFeatured!: boolean

  @Column({ name: 'publicado', default: false })
    isPublished!: boolean

  @Column({ name: 'publicado_em', type: "timestamp" })
    publishDate!: Date

  @Column({ name: 'revisado_em', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    revisionDate!: Date

  @Column({ name: 'criado_em', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    creationDate!: Date

  @Column({ name: 'foto', type: "varchar" })
    photo!: string
}
