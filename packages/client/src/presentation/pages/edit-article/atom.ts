import { EditorState } from 'draft-js'
import { atom } from 'recoil'

export const editArticleState = atom({
  key: 'editArticleState',
  default: {
    content: EditorState.createEmpty(),
    contentError: 'any error message here',
    wasSubmitted: true,
    title: '',
    titleError: 'any error message here',
    description: '',
    descriptionError: 'any error message here',
    coverPhoto: '',
    coverPhotoError: 'any error message here'
  }
})
