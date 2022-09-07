import React from 'react'
import Styles from './styles.scss'

type Props = {
  multiple: boolean
  message: string
}

const ImageUploader: React.FC<Props> = ({ multiple, message }: Props) => {
  return <div data-class='js-upload' className={Styles.imageUploader}>
  <span data-uk-icon="icon: cloud-upload"></span>
  <span>{message} ou </span>
  <div>
    <input type="file" multiple={multiple}/>
    <span> selecione a imagem</span>
  </div>
  <progress id="js-progressbar" value="0" max="100" hidden></progress>
</div>
}

export default ImageUploader
