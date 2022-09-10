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
      <div data-slider>
        <div tabIndex={-1}>
          <div data-slider-container>
            <ul>
              {articles.map((article, index) => <li key={index}>
                <StackedCard article={article}/>
              </li>)}
            </ul>
          </div>
          <div data-slider-nav>
            <a data-uk-slidenav-previous data-uk-slider-item="previous"></a>
            <a data-uk-slidenav-next data-uk-slider-item="next"></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Slider
