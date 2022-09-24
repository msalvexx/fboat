import React from 'react'
import Styles from './avatar-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  avatar: string
  title: string
  subtitle: string
}

const Avatar: React.FC<Props> = ({ className, avatar, title, subtitle }: Props) => {
  return (
    <div className={[Styles.avatar, className].join(' ')}>
      <img data-testid='avatar-photo' className='uk-border-circle' src={avatar} width="48" height="48"/>
      <div>
        <p data-testid='avatar-title'>{title}</p>
        <p data-testid='avatar-subtitle'>{subtitle}</p>
      </div>
    </div>
  )
}

export default Avatar
