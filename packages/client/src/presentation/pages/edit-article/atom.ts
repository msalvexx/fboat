import { atom } from 'recoil'

export const editArticleState = atom({
  key: 'editArticleState',
  default: {
    articleId: '',
    content: '',
    contentError: '',
    wasSubmitted: false,
    title: '',
    titleError: '',
    summary: '',
    summaryError: '',
    coverPhoto: '',
    coverPhotoError: '',
    isFormInvalid: false,
    savingChanges: false,
    mainError: '',
    submitter: ''
  }
})
