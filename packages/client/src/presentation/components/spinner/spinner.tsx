import React from 'react'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Spinner: React.FC<Props> = props => (
  <div>
    <div data-testid="spinner" data-uk-spinner {...props}></div>
  </div>
)

export default Spinner
