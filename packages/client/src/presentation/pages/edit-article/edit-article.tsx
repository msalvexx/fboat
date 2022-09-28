/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Styles from './edit-article-styles.scss'
import GlobalStyle from '@/client/presentation/styles/global.scss'

import { GetArticle } from '@fboat/core'
import { Handler } from '@/client/domain'
import { Validator } from '@/client/presentation/protocols'
import { ButtonGroup, Footer, Header, ImageUploader, Input, RichTextEditor } from '@/client/presentation/components'
import { editArticleState } from './atom'

type Props = {
  validator: Validator
  loadArticle?: Handler<GetArticle.Result>
}

const EditArticle: React.FC<Props> = ({ validator, loadArticle }) => {
  const [state, setState] = useRecoilState(editArticleState)
  const component = <ButtonGroup
    className={GlobalStyle.ukButtonWhite}
    defaultAction={{ handler: () => {}, name: 'Publicar' }}
    actions={[{ handler: () => {}, name: 'Salvar Rascunho' }]}
  />

  if (loadArticle) {
    setState({ ...state, isLoading: true, isEditMode: true })
    useEffect(() => {
      loadArticle({})
        .then(({ content, summary: description, title, coverPhoto }) => setState({ ...state, title, coverPhoto, content, description, isLoading: false }))
        .catch(error => {
          setState({ ...state, isLoading: false })
          console.error(error)
        })
    })
  }

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

  return <>
    <Header button={component}/>
    <section className={Styles.editArticle} data-testid='editor' data-mode={state.isEditMode ? 'edit' : 'create'}>
      <h3 className='uk-text-lead'>{state.isEditMode ? 'Alterar artigo' : 'Novo artigo'}</h3>
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
