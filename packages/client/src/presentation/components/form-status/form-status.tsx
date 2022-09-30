import React from 'react'
import Styles from './form-status-styles.scss'

import { Spinner } from '@/client/presentation/components'

type Props = {
  state: {
    isLoading?: boolean
    mainError: string
  }
}

const FormStatus: React.FC<Props> = ({ state }) => {
  const { isLoading, mainError } = state
  return (
    <div data-testid='form-status-wrap' className={Styles.errorWrap}>
      {isLoading && <Spinner/>}
      {mainError && <label data-testid='main-error' className={Styles.errorAlert}>{mainError}</label>}
    </div>
  )
}

export default FormStatus
