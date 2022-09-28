/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Styles from './edit-article-styles.scss'
import GlobalStyle from '@/client/presentation/styles/global.scss'

import { GetArticle } from '@fboat/core'
import { Handler } from '@/client/domain'
import { Validator } from '@/client/presentation/protocols'
import { Alert, ButtonGroup, Footer, Header, ImageUploader, Input, RichTextEditor } from '@/client/presentation/components'
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

  const load = (): void => {
    if (!loadArticle) return
    loadArticle({})
      .then(({ summary: description, ...article }) => setState(old => ({ ...old, ...article, description })))
      .catch(console.error)
  }

  const mode = state.articleId !== '' ? 'edit' : 'create'
  const isEditMode = mode === 'edit'

  const validate = (key: string): void => {
    const errors = validator({ [key]: state[key] })
    const newState: any = { [`${key}Error`]: '' }
    errors?.forEach(({ field, message }) => (newState[`${field}Error`] = message))
    const isFormInvalid = !!newState.contentError || !!newState.coverPhotoError || !!newState.descriptionError || !!newState.titleError
    setState(old => ({ ...old, ...newState, isFormInvalid }))
  }

  useEffect(() => load(), [])
  useEffect(() => validate('content'), [state.content])
  useEffect(() => validate('title'), [state.title])
  useEffect(() => validate('coverPhoto'), [state.coverPhoto])
  useEffect(() => validate('description'), [state.description])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, wasSubmitted: true, savingChanges: true })
  }

  return <>
    <Header button={component}/>
    <section className={Styles.editArticle} data-testid='editor' data-mode={mode} data-articleid={state.articleId}>
      {state.savingChanges && <Alert text='Publicando artigo...' theme='primary'/>}
      <h3 className='uk-text-lead'>{isEditMode ? 'Alterar artigo' : 'Novo artigo'}</h3>
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
