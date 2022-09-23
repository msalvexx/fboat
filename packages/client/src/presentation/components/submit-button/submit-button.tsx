import React from 'react'
import Styles from './submit-button-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text: string
  theme?: 'primary' | 'white'
}

const SubmitButton: React.FC<Props> = ({ className, text, theme }: Props) => {
  theme = theme ?? 'primary'
  return (
    <div data-testid="submit-wrap" className={[Styles.button, className].join(' ')}>
      <button data-testid="submit" data-theme={theme} type="submit">{text}</button>
    </div>
  )
}

export default SubmitButton
