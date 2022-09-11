import React from 'react'
import Styles from './styles.scss'

import { Footer, Header, SearchBar } from '@/presentation/components'

import { faker } from '@faker-js/faker'
import AccountsList from './accounts-list'

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
  return (<>
    <Header/>
    <SearchBar placeholder='Busque pelo nome ou e-mail cadastrado...'/>
    <section className={Styles.listAccounts}>
      <AccountsList accounts={accounts}/>
    </section>
    <Footer/>
  </>)
}

export default ListAccounts
