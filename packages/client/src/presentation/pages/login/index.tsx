import React, { useEffect } from 'react'
import Styles from './styles.scss'

import { Validator } from '@/client/presentation/protocols'
import { Input, SubmitButton, FormStatus, Footer, Header } from '@/client/presentation/components'
import { ForgotPassword } from './components'
import { loginState } from './components/atom'
import { useRecoilState } from 'recoil'
import { AuthenticateUser } from '@fboat/core/iam/protocols'

type Props = {
  validator: Validator
  service?: AuthenticateUser
}

const Login: React.FC<Props> = ({ validator, service }) => {
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => validate(), [state.email])
  useEffect(() => validate(), [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, wasSubmitted: true })
    if (state.isFormInvalid || state.isLoading) return
    setState({ ...state, isLoading: true })
    const { email, password } = state
    await service?.authenticate({ email, password })
  }

  const validate = (): void => {
    const { email, password } = state
    const errors = validator({ email, password })
    const newState: any = { emailError: '', passwordError: '' }
    errors?.forEach(({ field, message }) => (newState[`${field}Error`] = message))
    const isFormInvalid = !!newState.emailError || !!newState.passwordError
    setState(old => ({ ...old, ...newState, isFormInvalid }))
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
