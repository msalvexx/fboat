import React from 'react'
import Styles from './styles.scss'

import { ArticleProps, Avatar } from '@/presentation/components'

type CardProps = {
  article: ArticleProps
  direction?: 'left' | 'right'
}

const VerticalCard: React.FC<CardProps> = ({ article, direction }: CardProps) => {
  direction = direction ?? 'left'
  return (
    <a href={`/article/${article.slug}`} className={Styles.verticalCard}>
      <div data-class="uk-child-width-1-2@s" data-uk-grid>
        <div data-class={`uk-card-media-${direction} uk-flex-last@s`}>
            <img src={article.coverPhoto} alt=""/>
        </div>
        <div>
            <div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <Avatar
                  author={article.author}
                  avatar={article.avatar}
                  creationDate={article.publishDate}
                />
            </div>
        </div>
      </div>
    </a>
  )
}

export default VerticalCard
