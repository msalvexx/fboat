import React from 'react'

import { ArticleProps, Header, SearchBar, Slider, List, Footer } from '@/presentation/components'

const Home: React.FC = () => {
  const articles: ArticleProps[] = new Array(6).fill({
    author: 'Jhon Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&rounded=true',
    coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
    publishDate: new Date(),
    slug: 'any-slug',
    title: 'My Awesome Title',
    description: 'Any description here to write'
  })
  return (
    <>
      <Header/>
      <SearchBar/>
      <Slider sliderName='Em destaque' articles={articles}/>
      <List listName='Outros artigos' articles={articles}/>
      <Footer/>
    </>
  )
}

export default Home
