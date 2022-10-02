import React from 'react'
import Styles from './richtext-editor-styles.scss'
import GlobalStyles from '@/client/presentation/styles/global.scss'

import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

type Props = {
  name: string
  state?: any
  setState?: any
}

export const toHtml = (editorState: EditorState): string => draftToHtml(convertToRaw(editorState.getCurrentContent()))

export const toEditorState = (html: string): EditorState => {
  const contentBlock = htmlToDraft(html)
  if (!contentBlock) EditorState.createEmpty()
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  return EditorState.createWithContent(contentState)
}

const RichTextEditor: React.FC<Props> = ({ name, state, setState }) => {
  const wasSubmitted = state.wasSubmitted
  const error = state[`${name}Error`]
  return <div
    data-content-editor
    data-status={error && wasSubmitted ? 'invalid' : 'valid'}
    data-testid={name}
    data-value={state[name]}
    className={Styles.richTextEditor}>
      <Editor
        editorState={state[name]}
        onEditorStateChange={editorState => setState({ ...state, [name]: editorState }) }
      />
      {error && wasSubmitted && <label data-testid={`${name}-alert`} className={GlobalStyles.errorAlert}>{error}</label>}
  </div>
}

export default RichTextEditor
