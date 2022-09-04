import React, { createRef } from 'react'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon?: string
}

const Input: React.FC<Props> = ({ ...props }: Props) => {
  const inputRef = createRef<HTMLInputElement>()
  const error = true
  const errorMessage = 'Any error message here!'
  return (
    <>
      <div data-testid={`${props.name}-wrap`} className={Styles.input}>
        <div>
          <input
            {...props}
            ref={inputRef}
            data-status={error ? 'invalid' : 'valid'}
            data-testid={props.name}
            readOnly
            onFocus={e => { e.target.readOnly = false }}
          />
          {props.icon && <span data-uk-icon={`icon: ${props.icon}`}></span>}
          {error && <span data-status={error ? 'invalid' : 'valid'} data-uk-icon='icon: close'></span>}
        </div>
      </div>
      {error && <label className={Styles.errorAlert}>{errorMessage}</label>}
    </>
  )
}

export default Input
