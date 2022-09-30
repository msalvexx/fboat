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
    coverPhoto: null as File,
    coverPhotoError: '',
    isFormInvalid: true,
    savingChanges: false,
    mainError: '',
    submitter: ''
  }
})
