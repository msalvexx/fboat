import React, { useState } from 'react'
import Styles from './tabs-styles.scss'

type TabItem = {
  tabName: string
  content: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  active?: boolean
}

type Props = {
  tabs: TabItem[]
}

const Tabs: React.FC<Props> = ({ tabs }: Props) => {
  const [activeIndex, setActiveIndexState] = useState(tabs.findIndex(tab => tab.active === true) ?? 0)
  return (
    <div className={Styles.tab}>
        <ul data-uk-tab>
          {tabs.map((tab, index) => <li key={index} data-active={tab.active ?? false}>
            <a onClick={() => setActiveIndexState(index)}>
              {tab.tabName}
            </a>
          </li>)}
        </ul>
        <div>
          {tabs.map((tab, index) => <div hidden={activeIndex !== index} key={index}><>{tab.content}</></div>)}
        </div>
    </div>
  )
}

export default Tabs
