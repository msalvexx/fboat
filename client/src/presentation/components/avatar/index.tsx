import React from 'react'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  avatar: string
  author: string
  creationDate: Date
}

const Input: React.FC<Props> = ({ avatar, author, creationDate }: Props) => {
  return (
    <div className={Styles.avatar}>
      <img src={avatar} width="48" height="48"/>
      <div>
        <p>{author}</p>
        <p>{creationDate.toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default Input
