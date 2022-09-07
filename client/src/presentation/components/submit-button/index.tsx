import React from 'react'
import Styles from './styles.scss'

type Props = {
  text: string
  theme?: 'primary' | 'white'
}

const SubmitButton: React.FC<Props> = ({ text, theme }: Props) => {
  theme = theme ?? 'primary'
  return (
    <div data-testid="submit-wrap" className={Styles.button}>
      <button data-testid="submit" data-theme={theme} type="submit">{text}</button>
    </div>
  )
}

export default SubmitButton
