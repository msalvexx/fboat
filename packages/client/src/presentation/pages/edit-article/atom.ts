import { EditorState } from 'draft-js'
import { atom } from 'recoil'

export const editArticleState = atom({
  key: 'editArticleState',
  default: {
    articleId: '',
    content: EditorState.createEmpty(),
    contentError: '',
    wasSubmitted: false,
    title: '',
    titleError: '',
    summary: '',
    summaryError: '',
    coverPhoto: null as File,
    coverPhotoError: '',
    isFormInvalid: true,
    savingChanges: false,
    mainError: '',
    submitter: ''
  }
})
