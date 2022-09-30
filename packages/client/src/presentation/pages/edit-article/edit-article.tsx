/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import Styles from './edit-article-styles.scss'
import GlobalStyle from '@/client/presentation/styles/global.scss'

import { GetArticle } from '@fboat/core'
import { Handler } from '@/client/domain'
import { Validator } from '@/client/presentation/protocols'
import { Alert, ButtonGroup, Footer, FormStatus, Header, ImageUploader, Input, RichTextEditor } from '@/client/presentation/components'
import { editArticleState } from './atom'

type Props = {
  validator: Validator
  saveArticle: Handler<void>
  loadArticle?: Handler<GetArticle.Result>
}

const EditArticle: React.FC<Props> = ({ validator, loadArticle, saveArticle }) => {
  const [state, setState] = useRecoilState(editArticleState)

  const load = (): void => {
    if (!loadArticle) return
    loadArticle({})
      .then(article => setState(old => ({ ...old, ...article })))
      .catch(console.error)
  }

  const mode = state.articleId !== '' ? 'edit' : 'create'
  const isEditMode = mode === 'edit'

  const validate = (key: string): void => {
    const errors = validator({ [key]: state[key] })
    const newState: any = { [`${key}Error`]: '' }
    errors?.forEach(({ field, message }) => (newState[`${field}Error`] = message))
    const isFormInvalid = !!newState.contentError || !!newState.coverPhotoError || !!newState.summaryError || !!newState.titleError
    setState(old => ({ ...old, ...newState, isFormInvalid }))
  }

  useEffect(() => load(), [])
  useEffect(() => validate('content'), [state.content])
  useEffect(() => validate('title'), [state.title])
  useEffect(() => validate('coverPhoto'), [state.coverPhoto])
  useEffect(() => validate('summary'), [state.summary])

  const handler = async (submitter: string): Promise<void> => {
    setState({ ...state, wasSubmitted: true })
    if (state.isFormInvalid || state.savingChanges) return
    const isPublished = submitter === 'publish'
    setState({ ...state, savingChanges: true })
    const { articleId, title, content, summary, coverPhoto } = state
    let body: any = { isPublished, content, title, summary, coverPhoto }
    articleId && (body = { articleId, ...body })
    await saveArticle(body)
  }

  const component = <ButtonGroup
    className={GlobalStyle.ukButtonWhite}
    defaultAction={{ handler, text: 'Publicar', name: 'publish' }}
    actions={[{ handler, text: 'Salvar Rascunho', name: 'save-draft' }]}
  />

  return <>
    <Header button={component}/>
    <section className={Styles.editArticle} data-testid='editor' data-mode={mode} data-articleid={state.articleId}>
      {state.savingChanges && <Alert text='Publicando artigo...' theme='primary'/>}
      <h3 className='uk-text-lead'>{isEditMode ? 'Alterar' : 'Criar'} artigo</h3>
      <form data-testid='form'>
        <Input
          type='text'
          name='title'
          placeholder='Título'
          state={state}
          setState={setState} />
        <RichTextEditor
          name='content'
          state={state}
          setState={setState} />
        <Input
          type='text'
          name='summary'
          placeholder='Uma breve descrição'
          state={state}
          setState={setState} />
        <ImageUploader
          name='coverPhoto'
          message='Adicione a capa do artigo arrastando até aqui'
          multiple={false}
          state={state}
          setState={setState} />
        <FormStatus state={state} />
      </form>
    </section>
    <Footer/>
  </>
}

export default EditArticle
