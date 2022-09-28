import { EditorState } from 'draft-js'
import { atom } from 'recoil'

export const editArticleState = atom({
  key: 'editArticleState',
  default: {
    content: EditorState.createEmpty(),
    contentError: '',
    wasSubmitted: false,
    title: '',
    titleError: '',
    description: '',
    descriptionError: '',
    coverPhoto: '',
    coverPhotoError: '',
    isFormInvalid: false,
    isLoading: false
  }
})
