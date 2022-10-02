import React, { createRef } from 'react'
import Styles from './input-styles.scss'
import GlobalStyles from '@/client/presentation/styles/global.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon?: string
  state?: any
  setState?: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const inputRef = createRef<HTMLInputElement>()
  const wasSubmitted = state.wasSubmitted
  const error = state[`${props.name}Error`]
  return (
    <>
      <div className={Styles.input}>
        <div>
          <input
            {...props}
            ref={inputRef}
            data-status={error && wasSubmitted ? 'invalid' : 'valid'}
            data-testid={props.name}
            readOnly
            value={state[props.name]}
            onFocus={e => (e.target.readOnly = false)}
            onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
          />
          {props.icon && <span data-uk-icon={`icon: ${props.icon}`}></span>}
          {error && wasSubmitted && <span data-status={error && wasSubmitted ? 'invalid' : 'valid'} data-uk-icon='icon: close'></span>}
        </div>
      </div>
      {error && wasSubmitted && <label data-testid={`${props.name}-alert`} className={GlobalStyles.errorAlert}>{error}</label>}
    </>
  )
}

export default Input
