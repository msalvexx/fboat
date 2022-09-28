/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import Styles from './edit-article-styles.scss'

import { ButtonGroup, Footer, Header, ImageUploader, Input, RichTextEditor } from '@/client/presentation/components'

import GlobalStyle from '@/client/presentation/styles/global.scss'
import { useRecoilState } from 'recoil'
import { editArticleState } from './atom'

const EditArticle: React.FC = () => {
  const [state, setState] = useRecoilState(editArticleState)
  const component = <ButtonGroup
    className={GlobalStyle.ukButtonWhite}
    defaultAction={{ handler: () => {}, name: 'Publicar' }}
    actions={[{ handler: () => {}, name: 'Salvar Rascunho' }]}
  />
  const isEditing = false
  return <>
    <Header button={component}/>
    <section className={Styles.editArticle}>
      <h3 className='uk-text-lead'>{isEditing ? 'Alterar artigo' : 'Novo artigo'}</h3>
      <form>
        <fieldset>
          <Input type="text" name="title" state={state} setState={setState} placeholder="Título"/>
          <RichTextEditor name='content' state={state} setState={setState} />
          <Input type="text" name="description" state={state} setState={setState} placeholder="Uma breve descrição"/>
          <ImageUploader name='coverPhoto' state={state} setState={setState} multiple={false} message='Adicione a capa do artigo arrastando até aqui'/>
        </fieldset>
      </form>
    </section>
    <Footer/>
  </>
}

export default EditArticle
