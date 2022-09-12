import React, { useState } from 'react'
import Styles from './styles.scss'

import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

import { Footer, Header, ImageUploader, Input } from '@/presentation/components'

import GlobalStyle from '@/presentation/styles/global.scss'

const EditArticle: React.FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  const component = <button className={GlobalStyle.ukButtonWhite}>Publicar</button>
  return <>
    <Header button={component}/>
    <section className={Styles.editArticle}>
      <h3 className='uk-text-lead'>Novo artigo</h3>
      <form>
        <fieldset>
          <Input type="text" name="title" placeholder="Título"/>
          <div data-content-editor>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}/>
          </div>
          <Input type="text" name="description" placeholder="Uma breve descrição"/>
          <ImageUploader multiple={false} message='Adicione a capa do artigo arrastando até aqui'/>
        </fieldset>
      </form>
    </section>
    <Footer/>
  </>
}

export default EditArticle
