import React from 'react'
import Styles from './accounts-list-styles.scss'

import { Avatar, Actions } from '@/client/presentation/components'

export type AccountProps = {
  accountId: string
  avatar: string
  name: string
  email: string
}

type Props = {
  accounts: AccountProps[]
}

const AccountsList: React.FC<Props> = ({ accounts }: Props) => {
  return <div className={Styles.accountsList}>
    {accounts.map((account, index) =>
      <div key={index} data-card>
        <div>
          <div data-uk-grid>
            <div>
              <Avatar
                title={account.name}
                avatar={account.avatar}
                subtitle={account.email}
              />
            </div>
            <div>
              <Actions
                href={`/account/${account.accountId}/edit`}
                slugOrId={account.accountId}
                removeHandler={() => {} }
                resourceName='conta'
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
}

export default AccountsList
