import React from 'react'
import Styles from './styles.scss'

import { Header, Footer, SubmitButton } from '@/presentation/components'
import { Credentials, PersonalData } from './components'

const MyAccount: React.FC = () => {
  return (<>
      <Header/>
      <section className={Styles.myAccount}>
        <h3 className='uk-text-lead'>Minha Conta</h3>
        <PersonalData/>
        <Credentials/>
        <div data-uk-grid className='uk-flex-right'>
          <SubmitButton text='Salvar'/>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default MyAccount
