import React, { useState } from 'react'
import Styles from './actions-styles.scss'

type Props = {
  href: string
  slugOrId: string
  removeHandler: (slugOrId: string) => void
  className?: string
  resourceName: string
}

const Actions: React.FC<Props> = ({ resourceName, className, href, slugOrId, removeHandler }: Props) => {
  const [hideEditHover, setEditHideHoverState] = useState(true)
  const [hideRemoveHover, setRemoveHideHoverState] = useState(true)
  const onHover = (fn: Function, flag: boolean): void => fn(flag)
  return <div data-uk-grid className={[Styles.actions, className].join(' ')}>
    <div>
      <div>
        <a
          href={href}
          onMouseEnter={() => onHover(setEditHideHoverState, false)}
          onMouseLeave={() => onHover(setEditHideHoverState, true)}
          data-class="uk-icon-link uk-margin-small-right"
          data-uk-icon="icon: file-edit"></a>
        <div data-drop hidden={hideEditHover}>{`Alterar ${resourceName}`}</div>
      </div>
    </div>
    <div>
      <div>
        <a
          onClick={() => removeHandler(slugOrId)}
          onMouseEnter={() => onHover(setRemoveHideHoverState, false)}
          onMouseLeave={() => onHover(setRemoveHideHoverState, true)}
          data-class="uk-icon-link"
          data-uk-icon="icon: trash"></a>
        <div data-drop hidden={hideRemoveHover}>{`Remover ${resourceName}`}</div>
      </div>
    </div>
  </div>
}

export default Actions
