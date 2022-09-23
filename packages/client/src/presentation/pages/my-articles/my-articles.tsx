import React from 'react'
import Styles from './my-articles-styles.scss'

import { Footer, Header, Tabs } from '@/client/presentation/components'
import { ArticlesList } from './components'

const MyArticles: React.FC = () => {
  const publisheds = new Array(5).fill({
    author: 'Jhon Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&rounded=true',
    coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
    publishDate: new Date(),
    slug: 'any-slug',
    title: 'My Awesome Title',
    description: 'Any description here to write'
  })
  const saved = new Array(2).fill({
    author: 'Jhon Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&rounded=true',
    coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
    publishDate: new Date(),
    slug: 'any-slug',
    title: 'My Saved',
    description: 'Any desc to explain the article'
  })
  const tabs = [{
    tabName: 'Publicados',
    content: <ArticlesList articles={publisheds} />,
    active: true
  }, {
    tabName: 'Rascunhos',
    content: <ArticlesList articles={saved} />
  }]
  return (
    <>
      <Header buttonHidden={true}/>
      <section className={Styles.myArticles}>
        <div className={Styles.info}>
          <p>Meus Artigos</p>
          <a href='/article/new'>Criar Artigo</a>
        </div>
        <Tabs tabs={tabs}/>
      </section>
      <Footer/>
    </>
  )
}

export default MyArticles
