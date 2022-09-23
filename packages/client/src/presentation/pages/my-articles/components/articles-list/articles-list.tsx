import React from 'react'
import Styles from './articles-list-styles.scss'

import { ArticleProps, Actions } from '@/client/presentation/components'

type Props = {
  articles: ArticleProps[]
}

const ArticlesList: React.FC<Props> = ({ articles }: Props) => {
  return (
    <div className={Styles.articlesList}>
      {articles.map((article, index) =>
        <div key={index} data-class="uk-child-width-expand@s" data-uk-grid>
          <div data-class='uk-card-media-left uk-flex-last@s'>
              <img src={article.coverPhoto} alt=""/>
          </div>
          <div>
            <div data-uk-grid>
              <div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p>Publicado em {article.publishDate.toLocaleDateString()}</p>
              </div>
              <div>
                <Actions
                  href={`/article/${article.slug}/edit`}
                  slugOrId={article.slug}
                  removeHandler={() => {}}
                  resourceName='artigo'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticlesList
