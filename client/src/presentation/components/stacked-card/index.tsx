import React from 'react'
import Styles from './styles.scss'

import { Avatar } from '@/presentation/components'

export type ArticleProps = {
  author: string
  avatar: string
  title: string
  coverPhoto: string
  publishDate: Date
  slug: string
  description: string
}

type CardProps = {
  article: ArticleProps
}

const Card: React.FC<CardProps> = ({ article }: CardProps) => {
  return (
    <a href={`/article/${article.slug}`} className={Styles.card}>
      <div>
          <div>
            <img src={article.coverPhoto} width="1800" height="1200"/>
          </div>
          <div>
              <h3>{article.title}</h3>
              <Avatar
                author={article.author}
                avatar={article.avatar}
                creationDate={article.publishDate}
              />
          </div>
      </div>
  </a>
  )
}

export default Card
