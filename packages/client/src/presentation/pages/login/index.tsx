import React from 'react'
import Styles from './styles.scss'

import { Input, SubmitButton, FormStatus, Footer, Header } from '@/client/presentation/components'
import { ForgotPassword } from './components'
import { loginState } from './components/atom'
import { useRecoilState } from 'recoil'

const Login: React.FC = () => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <>
    <div className={Styles.login}>
      <Header/>
      <section>
       <div>
        <div>
          <h3>Bem vindo de volta!</h3>
          <form className={Styles.form}>
            <Input state={state} setState={setState} type='email' name='email' placeholder='e-mail'/>
            <Input state={state} setState={setState} type='password' name='password' placeholder='senha'/>
            <SubmitButton text='Entrar' state={state}></SubmitButton>
            <FormStatus state={state}/>
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
