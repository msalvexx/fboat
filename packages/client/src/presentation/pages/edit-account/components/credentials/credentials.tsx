import { Input, Select } from '@/client/presentation/components'
import React from 'react'
import Styles from './credentials-styles.scss'

const Credentials: React.FC = () => {
  const defaultRoles = [{
    label: 'Escritor',
    value: 'Writer'
  }]
  const roles = [{
    label: 'Administrador',
    value: 'Administrator'
  }, {
    label: 'Leitor de Informações do F-Boat',
    value: 'FBoatReader'
  }, {
    label: 'Controlador do F-Boat',
    value: 'FBoatController'
  }, ...defaultRoles]
  return (<div className={Styles.credentials}>
      <p>Credenciais</p>
      <div data-card className="uk-width-1-1@m">
        <form className={Styles.form}>
          <Input type="email" name="email" placeholder="E-mail"/>
          <Input type="password" name="password" placeholder="Senha"/>
          <Select name="roles" placeholder='Selecione os perfis de acesso' isMulti options={roles} defaultValue={defaultRoles}/>
        </form>
      </div>
  </div>)
}

export default Credentials
