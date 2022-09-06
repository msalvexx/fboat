import React from 'react'
import Styles from './styles.scss'

import { StackedCard, ArticleProps } from '@/presentation/components'

type Props = {
  sliderName: string
  articles: ArticleProps[]
}

const Slider: React.FC<Props> = ({ sliderName, articles }: Props) => {
  return (
    <section className={Styles.slider}>
      <p>{sliderName}</p>
      <div>
        <div tabIndex={-1}>
          <ul>
            {articles.map((article, index) => <li key={index}>
              <StackedCard article={article}/>
            </li>)}
          </ul>
          <a data-href="#" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
          <a data-href="#" data-uk-slidenav-next data-uk-slider-item="next"></a>
        </div>
      </div>
    </section>
  )
}

export default Slider
