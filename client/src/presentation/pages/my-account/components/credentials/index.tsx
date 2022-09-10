import { Input } from '@/presentation/components'
import React from 'react'
import Styles from './styles.scss'

const Credentials: React.FC = () => {
  return (<div className={Styles.credentials}>
      <p>Credenciais</p>
      <div data-card className="uk-width-1-1@m">
        <form className={Styles.form}>
          <Input type="email" name="email" placeholder="E-mail"/>
          <Input type="password" name="password" placeholder="Senha"/>
        </form>
      </div>
  </div>)
}

export default Credentials
