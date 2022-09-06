import React from 'react'
import Styles from './styles.scss'

const Header: React.FC = () => {
  const isLogged = true
  return (
    <nav className={Styles.header}>
        <div>
            <a href="#">F-Boat</a>
        </div>

        <div>
          <ul>
            <a href="#">Sobre o projeto</a>
          </ul>
          { isLogged && <>
              <ul>
                <a href="#">Meus Artigos</a>
              </ul>
              <ul className={Styles.logout}>
                <a href="#">Sair</a>
              </ul>
            </>
          }
          <div>
            {isLogged ? <button>Criar Artigo</button> : <button>Entrar</button>}
          </div>
        </div>
    </nav>
  )
}

export default Header
