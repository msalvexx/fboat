import React from 'react'
import Styles from './forgot-password-styles.scss'

const SubmitButton: React.FC = () => {
  return (
    <div className={Styles.forgotPassword}>
      <label>Esqueceu a senha? <a href="#">Recupere aqui</a></label>
    </div>
  )
}

export default SubmitButton
