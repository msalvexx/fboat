import { atom } from 'recoil'

export const editArticleState = atom({
  key: 'editArticleState',
  default: {
    content: '',
    contentError: '',
    wasSubmitted: false,
    title: '',
    titleError: '',
    description: '',
    descriptionError: '',
    coverPhoto: '',
    coverPhotoError: '',
    isFormInvalid: false,
    isLoading: false,
    isEditMode: false
  }
})
