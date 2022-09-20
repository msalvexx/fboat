import React, { createRef } from 'react'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon?: string
  state?: any
  setState?: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const inputRef = createRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]
  return (
    <>
      <div className={Styles.input}>
        <div>
          <input
            {...props}
            ref={inputRef}
            data-status={error ? 'invalid' : 'valid'}
            data-testid={props.name}
            readOnly
            onFocus={e => { e.target.readOnly = false }}
            onChange={e => { setState({ ...state, [e.target.name]: e.target.value }) }}
          />
          {props.icon && <span data-uk-icon={`icon: ${props.icon}`}></span>}
          {error && <span data-status={error ? 'invalid' : 'valid'} data-uk-icon='icon: close'></span>}
        </div>
      </div>
      {error && <label data-testid={`${props.name}-alert`} className={Styles.errorAlert}>{error}</label>}
    </>
  )
}

export default Input
