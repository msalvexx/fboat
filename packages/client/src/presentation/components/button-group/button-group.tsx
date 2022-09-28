import React from 'react'
import Styles from './button-group-styles.scss'

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
          <button data-testid={defaultAction.name} className={[Styles.dropdownIcon, 'uk-button', 'uk-button-default', className].join(' ')} >
            <span data-uk-icon='icon: triangle-down'></span>
          </button>
          <div className={Styles.buttonOptions} data-uk-dropdown='mode: click; target: !.uk-button-group;'>
              <ul className='uk-nav uk-dropdown-nav'>
                  {actions.map((action, index) => <li key={index}>
                    <button data-testid={action.name} onClick={action.handler}>{action.name}</button>
                  </li>)}
              </ul>
          </div>
      </div>
  </div>
}

export default ButtonGroup
