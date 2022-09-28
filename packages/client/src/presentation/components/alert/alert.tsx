import React from 'react'
import Styles from './alert-styles.scss'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  text: string
  theme?: 'primary' | 'default' | 'success' | 'danger' | 'warning'
}

const Alert: React.FC<Props> = ({ text, theme = 'default', ...props }) => {
  return <div data-testid='alert' className={[`uk-alert-${theme}`, Styles.alert].join(' ')} data-uk-alert {...props}>
      <a className='uk-alert-close' data-uk-close></a>
      <p>{text}</p>
  </div>
}

export default Alert
