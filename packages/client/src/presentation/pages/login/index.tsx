import React from 'react'
import Styles from './styles.scss'

import { Input, SubmitButton, Spinner, Footer, Header } from '@/client/presentation/components'
import { ForgotPassword } from './components'

const Login: React.FC = () => {
  return (
    <>
    <div className={Styles.login}>
      <Header/>
      <section>
       <div>
        <div>
          <h3>Bem vindo de volta!</h3>
          <form className={Styles.form}>
            <Input type="email" name="email" placeholder="e-mail"/>
            <Input type="password" name="password" placeholder="senha"/>
            <SubmitButton text="Entrar"></SubmitButton>
            <Spinner/>
            <ForgotPassword/>
          </form>
        </div>
       </div>
      </section>
    </div>
    <Footer/>
    </>
  )
}

export default Login
