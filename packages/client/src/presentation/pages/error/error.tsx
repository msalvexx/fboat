import React from 'react'
import Styles from './error-styles.scss'

import { Footer, Header } from '@/client/presentation/components'

type Props = {
  title: string
  message: string
}

const Error: React.FC<Props> = ({ title, message }) => {
  return <>
    <Header />
    <section className={Styles.error}>
      <h1 className={['uk-heading-line', 'uk-text-center'].join(' ')}>
        <span>{title}</span>
      </h1>
      <p>{message}</p>
    </section>
    <Footer />
  </>
}

export default Error
