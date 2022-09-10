import React from 'react'
import Styles from './styles.scss'

import { Header, Avatar, ArticleProps, Slider, Footer } from '@/presentation/components'

const ViewArticle: React.FC = () => {
  const content = `
  <p>I have been a self-taught programmer since I was 12 years old and sice then I’ve learned a ton of computer related stuff. I am definitely not a beginner anymore, but when exactly was the moment this has changed? Then it all clicked and I knew that <b>THERE IS ONE IMPORTANT THING</b> that separates the early-learners from the experienced coders.</p>

  <h4>Tough first steps</h4>
  
  <p>When you first start learning about programming, most people don’t know where to start. And I understand that. There are so many programming languages, specializations, platforms, code editors, you name it. It is overwhelming, at least it has been for me.</p>

  <p>So then you reach out to the community and ask. <b>“What to learn first? Which programming language is the best? Should I buy this book? Should I attend a bootcamp?”</b> Well, from my experience, you don’t get an answer, that would satisfy you, nor should it, because the replies usually look something along the lines of “It depends…” And I still think, that is the absolutely right answer. But as a noobie you don’t understand that.</p>

  <p>The things start really rolling when you finally make that first step and pick a programming language and finally start learning.</p>

  <h4>I want MORE!</h4>
  <p>You may find after a while, that the language does not actually suit all your needs. In my opinion (which many experienced software developers share), <b>there is no one language to rule them all,</b> not a single one can do everything better than others. There is JavaScript for Web, Swift for iOS Development, Python for Machine learning, C++ for Game Dev, and so on.</p>

  <p>So after stumbling through the basics you may be curious to try a different language. And this is again the part, where you start asking on Reddit or your more experienced programming buddies. “Which programming language should I learn?”</p>

  <h4>The breaking point</h4>
  <p>After a while you realize the truth. There is no “best programming language”. You simply start picking the languages which best suit your needs. And this is what I consider THE MOMENT you are not a beginner programmer anymore.</p>

  <p>As you grasp the fundamentals and learn the basic paradigms of coding, you no longer have a problem with simply looking up what a while-loop looks like in Rust or how to declare a function in C#.</p>

  <p>Yes, there are some concepts which are distinct for some languages but the basics are still the same. It is no longer about “what is the syntax to do this”, but rather “how to solve this problem and make it run efficiently”.</p>

  <p>I have recently started learning C and it has been a like a whole new exciting world for me. As I said, many things I knew from other languages, however, stuff like memory allocation or pointers completely blew my mind. Finally, I could understand how it all works on a deeper level.</p>

  <p>And this is always fascinating when I look into something that used to be like a black box for me.</p>

  <p>It has been a pleasure to share this idea with you and I hope you enjoyed my first post here on Medium 👋</p>`

  const title = 'A Sign You Are Not A Beginner Programmer Anymore'
  const description = 'And the single moment it all changed for me'
  const avatar = 'https://ui-avatars.com/api/?name=John+Doe&rounded=true'
  const author = 'Jhon Doe'
  const creationDate = new Date()
  const photo = 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg'
  const authorRelated: ArticleProps[] = new Array(6).fill({
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
      <article className={Styles.viewArticle}>
        <h1>{title}</h1>
        <p>{description}</p>
        <Avatar avatar={avatar} title={author} subtitle={creationDate.toLocaleDateString()} />
        <img src={photo} />
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
      <Slider sliderName='Mais conteúdos deste autor' articles={authorRelated}/>
      <Footer/>
    </>
  )
}

export default ViewArticle
