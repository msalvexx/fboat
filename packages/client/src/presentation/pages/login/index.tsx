import React, { useEffect } from 'react'
import Styles from './styles.scss'

import { Validator } from '@/client/presentation/protocols'
import { Input, SubmitButton, FormStatus, Footer, Header } from '@/client/presentation/components'
import { ForgotPassword } from './components'
import { loginState } from './components/atom'
import { useRecoilState } from 'recoil'

type Props = {
  validator: Validator
}

const Login: React.FC<Props> = ({ validator }) => {
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => validate(), [state.email])
  useEffect(() => validate(), [state.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState({ ...state, wasSubmitted: true })
    if (state.isFormInvalid || state.isLoading) return
    setState({ ...state, isLoading: true })
  }

  const validate = (): void => {
    const { email, password } = state
    const errors = validator({ email, password })
    if (!errors) {
      setState(old => ({ ...old, emailError: '' }))
      setState(old => ({ ...old, passwordError: '' }))
    } else {
      errors.forEach(({ field, message }) => setState(old => ({ ...old, [`${field}Error`]: message })))
    }
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  return (
    <>
    <div className={Styles.login}>
      <Header/>
      <section>
       <div>
        <div>
          <h3>Bem vindo de volta!</h3>
          <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
            <Input state={state} setState={setState} type='text' name='email' placeholder='e-mail'/>
            <Input state={state} setState={setState} type='password' name='password' placeholder='senha'/>
            <SubmitButton text='Entrar'></SubmitButton>
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
