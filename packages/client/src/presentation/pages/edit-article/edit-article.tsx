/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Styles from './edit-article-styles.scss'
import GlobalStyle from '@/client/presentation/styles/global.scss'

import { ButtonGroup, Footer, Header, ImageUploader, Input, RichTextEditor } from '@/client/presentation/components'
import { Validator } from '@/client/presentation/protocols'
import { editArticleState } from './atom'

type Props = {
  validator: Validator
}

const EditArticle: React.FC<Props> = ({ validator }) => {
  const [state, setState] = useRecoilState(editArticleState)
  const component = <ButtonGroup
    className={GlobalStyle.ukButtonWhite}
    defaultAction={{ handler: () => {}, name: 'Publicar' }}
    actions={[{ handler: () => {}, name: 'Salvar Rascunho' }]}
  />

  useEffect(() => validate(), [state.content])
  useEffect(() => validate(), [state.title])
  useEffect(() => validate(), [state.coverPhoto])
  useEffect(() => validate(), [state.description])

  const validate = (): void => {
    const { content, coverPhoto, description, title } = state
    const errors = validator({ content, coverPhoto, description, title })
    const newState: any = { content: '', coverPhoto: '', description: '', title: '' }
    errors?.forEach(({ field, message }) => (newState[`${field}Error`] = message))
    const isFormInvalid = !!newState.content || !!newState.coverPhoto || !!newState.description || !!newState.title
    setState(old => ({ ...old, ...newState, isFormInvalid }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, wasSubmitted: true })
  }

  const isEditing = false
  return <>
    <Header button={component}/>
    <section className={Styles.editArticle}>
      <h3 className='uk-text-lead'>{isEditing ? 'Alterar artigo' : 'Novo artigo'}</h3>
      <form data-testid='form' onSubmit={handleSubmit}>
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
