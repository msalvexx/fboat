import React from 'react'
import Styles from './styles.scss'

import { Header, Footer, SubmitButton } from '@/client/presentation/components'
import { Credentials, PersonalData } from './components'
import { editAccountState } from './components/atom'

const EditAccount: React.FC = () => {
  const [state] = useRecoil(editAccountState)
  return (<>
      <Header/>
      <section className={Styles.editAccount}>
        <h3 className='uk-text-lead'>Minha Conta</h3>
        <PersonalData/>
        <Credentials/>
        <div data-uk-grid className='uk-flex-right'>
          <SubmitButton state={state} text='Salvar'/>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default EditAccount
function useRecoil(editAccountState: any): [any] {
  throw new Error('Function not implemented.')
}

