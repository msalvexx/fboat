import React from 'react'

import { ArticleProps, Header, SearchBar, Slider, List, Footer } from '@/presentation/components'

import { faker } from '@faker-js/faker'

const Home: React.FC = () => {
  let articles1: ArticleProps[] = []
  let articles2: ArticleProps[] = []
  for (let index = 0; index < 6; index++) {
    articles1[index] = {
      author: faker.name.fullName(),
      avatar: faker.image.avatar(),
      coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
      publishDate: new Date(),
      slug: 'any-slug',
      title: faker.lorem.words(),
      description: faker.lorem.sentence()
    }
    articles2[index] = {
      author: faker.name.fullName(),
      avatar: faker.image.avatar(),
      coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
      publishDate: new Date(),
      slug: 'any-slug',
      title: faker.lorem.words(),
      description: faker.lorem.sentence()
    }
  }
  articles1 = articles1.map(x => ({
    author: faker.name.fullName(),
    avatar: faker.image.avatar(),
    coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
    publishDate: new Date(),
    slug: 'any-slug',
    title: faker.lorem.words(),
    description: faker.lorem.sentence()
  }))
  articles2 = articles2.map(x => ({
    author: faker.name.fullName(),
    avatar: faker.image.avatar(),
    coverPhoto: 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg',
    publishDate: new Date(),
    slug: 'any-slug',
    title: faker.lorem.words(),
    description: faker.lorem.sentence()
  }))
  return (
    <>
      <Header/>
      <SearchBar/>
      <Slider sliderName='Em destaque' articles={articles1}/>
      <List listName='Outros artigos' articles={articles2}/>
      <Footer/>
    </>
  )
}

export default Home
