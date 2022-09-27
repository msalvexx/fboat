import React, { useEffect } from 'react'
import Styles from './slider-styles.scss'

import { StackedCard, ArticleProps } from '@/client/presentation/components'
import UIkit from 'uikit'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  sliderName: string
  articles: ArticleProps[]
  className?: string
}

const Slider: React.FC<Props> = ({ className, sliderName, articles, ...props }: Props) => {
  useEffect(() => {
    UIkit.slider('[data-slider]')
  }, [articles])
  return (
    <section className={[Styles.slider, className].join(' ')} {...props}>
      <p>{sliderName}</p>
      <div data-slider data-uk-slider data-tabindex="-1">
        <div tabIndex={-1}>
          <div className='uk-slider-container uk-light' data-slider-container data-tabindex="-1">
            <ul data-testid='slider-items' className='uk-slider-items uk-child-width-1-3@s uk-grid uk-grid-small'>
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
