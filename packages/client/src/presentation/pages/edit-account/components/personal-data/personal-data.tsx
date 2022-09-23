import { Input } from '@/client/presentation/components'
import React from 'react'
import Styles from './personal-data-styles.scss'

const PersonalData: React.FC = () => {
  return (<div className={Styles.personalData}>
      <p>Dados pessoais</p>
      <div data-card className="uk-width-1-1@m">
        <form className={Styles.form}>
          <Input type="text" name="first_name" placeholder="Nome"/>
          <Input type="text" name="last_name" placeholder="Sobrenome"/>
          <Input type="text" name="occupation" placeholder="Profissão"/>
          <Input type="date" name="birth_date" placeholder="Data de nascimento"/>
        </form>
      </div>
    </div>
  )
}

export default PersonalData
