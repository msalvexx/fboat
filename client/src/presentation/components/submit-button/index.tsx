import React from 'react'
import Styles from './styles.scss'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  return (
    <div data-testid="submit-wrap" className={Styles.button}>
      <button data-testid="submit" type="submit">{text}</button>
    </div>
  )
}

export default SubmitButton
