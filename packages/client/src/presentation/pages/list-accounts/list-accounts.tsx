import React from 'react'
import Styles from './list-accounts-styles.scss'
import GlobalStyle from '@/client/presentation/styles/global.scss'

import { Footer, Header, SearchBar } from '@/client/presentation/components'
import AccountsList from './accounts-list/accounts-list'

import { faker } from '@faker-js/faker'

const ListAccounts: React.FC = () => {
  const accounts: any[] = []
  for (let index = 0; index < 6; index++) {
    accounts[index] = {
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
      accountId: faker.datatype.uuid(),
      email: faker.internet.email()
    }
  }
  const primaryButton = <a className={GlobalStyle.ukButtonWhite}>Criar conta</a>
  return (<>
    <Header button={primaryButton}/>
    <SearchBar placeholder='Busque pelo nome ou e-mail cadastrado...'/>
    <section className={Styles.listAccounts}>
      <AccountsList accounts={accounts}/>
    </section>
    <Footer/>
  </>)
}

export default ListAccounts
