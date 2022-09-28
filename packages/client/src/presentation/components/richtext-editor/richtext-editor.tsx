import React from 'react'
import Styles from './richtext-editor-styles.scss'
import GlobalStyles from '@/client/presentation/styles/global.scss'

import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

type Props = {
  name: string
  state?: any
  setState?: any
}

const RichTextEditor: React.FC<Props> = ({ name, state, setState }) => {
  const wasSubmitted = state.wasSubmitted
  const error = state[`${name}Error`]
  return <div
    data-content-editor
    data-status={error && wasSubmitted ? 'invalid' : 'valid'}
    data-testid={name}
    className={Styles.richTextEditor}>
      <Editor
        editorState={state[name]}
        onEditorStateChange={editorState => setState({ ...state, [name]: draftToHtml(convertToRaw(editorState.getCurrentContent())) })}
      />
      {error && wasSubmitted && <label data-testid={`${name}-alert`} className={GlobalStyles.errorAlert}>{error}</label>}
  </div>
}

export default RichTextEditor
