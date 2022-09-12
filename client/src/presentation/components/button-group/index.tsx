import React from 'react'
import Styles from './styles.scss'

type Action = {
  handler: () => void
  name: string
}

type Props = {
  defaultAction: Action
  actions: Action[]
  className?: string
}

const ButtonGroup: React.FC<Props> = ({ className, actions, defaultAction }: Props) => {
  return <div className='uk-button-group'>
      <a onClick={defaultAction.handler} className={['uk-button', 'uk-button-default', className].join(' ')}>{defaultAction.name}</a>
      <div className='uk-inline'>
          <button className={[Styles.dropdownIcon, 'uk-button', 'uk-button-default', className].join(' ')} type='button'>
            <span data-uk-icon='icon: triangle-down'></span>
          </button>
          <div className={Styles.buttonOptions} data-uk-dropdown='mode: click; target: !.uk-button-group;'>
              <ul className='uk-nav uk-dropdown-nav'>
                  {actions.map((action, index) => <li key={index}>
                    <a onClick={action.handler}>{action.name}</a>
                  </li>)}
              </ul>
          </div>
      </div>
  </div>
}

export default ButtonGroup
