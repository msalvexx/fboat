import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import Styles from './edit-article-styles.scss'
import GlobalStyle from '@/client/presentation/styles/global.scss'

import { GetArticle, SaveAttachment } from '@fboat/core'
import { Handler } from '@/client/domain'
import { Validator } from '@/client/presentation/protocols'
import { Alert, ButtonGroup, Footer, Header, ImageUploader, Input, RichTextEditor, toEditorState, toHtml } from '@/client/presentation/components'
import { editArticleState } from './atom'
import { useNavigate } from 'react-router-dom'

type Props = {
  validator: Validator
  saveArticle: Handler<void>
  loadArticle?: Handler<GetArticle.Result>
  uploadImage: Handler<SaveAttachment.Result>
}

const EditArticle: React.FC<Props> = ({ validator, loadArticle, saveArticle, uploadImage }) => {
  const resetState = useResetRecoilState(editArticleState)
  const [state, setState] = useRecoilState(editArticleState)
  const navigate = useNavigate()

  const load = (): void => {
    resetState()
    if (!loadArticle) return
    loadArticle({})
      .then(({ coverPhoto, content, ...article }) => setState({ ...state, ...article, content: toEditorState(content) }))
      .catch(error => {
        console.error(error)
        navigate('/404')
      })
  }

  const mode = loadArticle !== undefined ? 'edit' : 'create'
  const isEditMode = mode === 'edit'

  const validate = (): void => {
    const { content, coverPhoto, summary, title } = state
    const errors = validator({ content, coverPhoto, summary, title })
    const newState: any = {}
    errors?.forEach(({ field, message }) => (newState[`${field}Error`] = message))
    const isFormInvalid = !!newState.contentError || !!newState.coverPhotoError || !!newState.summaryError || !!newState.titleError
    setState(old => ({ ...old, ...newState, isFormInvalid }))
  }

  useEffect(() => load(), [])
  useEffect(() => validate(), [state.content])
  useEffect(() => validate(), [state.title])
  useEffect(() => validate(), [state.coverPhoto])
  useEffect(() => validate(), [state.summary])

  const handler = async (submitter: string): Promise<void> => {
    setState({ ...state, wasSubmitted: true })
    if (state.isFormInvalid || state.savingChanges) return
    const isPublished = submitter === 'publish'
    setState({ ...state, savingChanges: true })
    const { title, content, summary, coverPhoto } = state
    let body: any = { isPublished, content: toHtml(content), title, summary }
    try {
      if (coverPhoto) {
        const { url } = await uploadImage({ file: coverPhoto })
        body = { ...body, coverPhoto: url }
      }
      await saveArticle(body)
      navigate('/my-articles')
    } catch (error) {
      setState({ ...state, mainError: error.message, savingChanges: false })
    }
  }

  const component = <ButtonGroup
    className={GlobalStyle.ukButtonWhite}
    defaultAction={{ handler, text: 'Publicar', name: 'publish' }}
    actions={[{ handler, text: 'Salvar Rascunho', name: 'save-draft' }]}
  />

  return <>
    <Header button={component}/>
    <section className={Styles.editArticle} data-testid='editor' data-mode={mode} data-articleid={state.articleId}>
      {state.savingChanges && <Alert data-testid='saving-alert' text='Publicando artigo...' theme='primary'/>}
      {state.mainError && <Alert data-testid='error-alert' text={state.mainError} theme='danger'/>}
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
      </form>
    </section>
    <Footer/>
  </>
}

export default EditArticle
