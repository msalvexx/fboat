import React from 'react'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  avatar: string
  title: string
  subtitle: string
}

const Input: React.FC<Props> = ({ className, avatar, title, subtitle }: Props) => {
  return (
    <div className={[Styles.avatar, className].join(' ')}>
      <img className='uk-border-circle' src={avatar} width="48" height="48"/>
      <div>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default Input
