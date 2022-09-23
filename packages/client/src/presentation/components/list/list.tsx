import React from 'react'
import Styles from './list-styles.scss'

import { VerticalCard, ArticleProps } from '@/client/presentation/components'

type Props = {
  listName: string
  articles: ArticleProps[]
}

const List: React.FC<Props> = ({ listName, articles }: Props) => {
  return (
    <section className={Styles.list}>
      <p>{listName}</p>
      {articles.map((article, index) => <VerticalCard key={index} article={article} direction={index % 2 === 0 ? 'left' : 'right'}/>)}
    </section>
  )
}

export default List
