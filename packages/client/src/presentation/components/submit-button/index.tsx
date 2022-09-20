import React from 'react'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text: string
  theme?: 'primary' | 'white'
  state: {
    isFormInvalid: boolean
  }
}

const SubmitButton: React.FC<Props> = ({ className, text, theme, state }: Props) => {
  const { isFormInvalid } = state
  theme = theme ?? 'primary'
  return (
    <div data-testid="submit-wrap" className={[Styles.button, className].join(' ')}>
      <button disabled={isFormInvalid} data-testid="submit" data-theme={theme} type="submit">{text}</button>
    </div>
  )
}

export default SubmitButton
