import React from 'react'
import Styles from './button-group-styles.scss'

type Action = {
  handler?: (fieldName: string) => Promise<void> | void
  text: string
  name: string
}

type Props = {
  defaultAction: Action
  actions: Action[]
  className?: string
}

const ButtonGroup: React.FC<Props> = ({ className, actions, defaultAction }: Props) => {
  return <div className='uk-button-group'>
      <button
        name={defaultAction.name}
        data-testid={defaultAction.name}
        className={['uk-button', 'uk-button-default', className].join(' ')}
        onClick={() => defaultAction.handler(defaultAction.name)}>{defaultAction.text}</button>
      <div className='uk-inline'>
          <button className={[Styles.dropdownIcon, 'uk-button', 'uk-button-default', className].join(' ')} >
            <span data-uk-icon='icon: triangle-down'></span>
          </button>
          <div className={Styles.buttonOptions} data-uk-dropdown='mode: click; target: !.uk-button-group;'>
              <ul className='uk-nav uk-dropdown-nav'>
                  {actions.map((action, index) => <li key={index}>
                    <a data-testid={action.name} onClick={() => action.handler(action.name)}>{action.text}</a>
                  </li>)}
              </ul>
          </div>
      </div>
  </div>
}

export default ButtonGroup
