import React from 'react'
import Styles from './image-uploader-styles.scss'
import GlobalStyles from '@/client/presentation/styles/global.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  multiple: boolean
  message: string
  state?: any
  setState?: any
}

const ImageUploader: React.FC<Props> = ({ multiple, message, state, setState, ...props }: Props) => {
  const wasSubmitted = state.wasSubmitted
  const error = state[`${props.name}Error`]
  const status = error && wasSubmitted ? 'invalid' : 'valid'
  return <>
  <div
    data-status={status}
    data-class='js-upload'
    className={Styles.imageUploader}>
      <span data-uk-icon="icon: cloud-upload"></span>
      <span>{message} ou </span>
      <div>
        <input
          {...props}
          name={props.name}
          type="file"
          data-value={state[props.name]}
          data-status={status}
          data-testid={props.name}
          multiple={multiple}
          onChange={e => setState({ ...state, [e.target.name]: multiple ? e.target.files : e.target.files[0] }) }
        />
        <span> selecione a imagem</span>
      </div>
      <progress id="js-progressbar" value="0" max="100" hidden></progress>
  </div>
  {error && wasSubmitted && <label data-testid={`${props.name}-alert`} className={GlobalStyles.errorAlert}>{error}</label>}
  </>
}

export default ImageUploader
