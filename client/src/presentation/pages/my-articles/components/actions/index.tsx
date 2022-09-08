import React, { useState } from 'react'
import Styles from './styles.scss'

type Props = {
  slugOrId: string
  removeHandler: (slugOrId: string) => void
}

const Actions: React.FC<Props> = ({ slugOrId, removeHandler }: Props) => {
  const [hideEditHover, setEditHideHoverState] = useState(true)
  const [hideRemoveHover, setRemoveHideHoverState] = useState(true)
  const onHover = (fn: Function, flag: boolean): void => fn(flag)
  return <div data-uk-grid className={Styles.actions}>
    <div>
      <div>
        <a
          href={`/article/${slugOrId}/edit`}
          onMouseEnter={() => onHover(setEditHideHoverState, false)}
          onMouseLeave={() => onHover(setEditHideHoverState, true)}
          data-class="uk-icon-link uk-margin-small-right"
          data-uk-icon="icon: file-edit"></a>
        <div hidden={hideEditHover} data-uk-drop='pos: right-top'>Alterar artigo</div>
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
        <div hidden={hideRemoveHover} data-uk-drop='pos: right-top'>Remover artigo</div>
      </div>
    </div>
  </div>
}

export default Actions
