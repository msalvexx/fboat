import React from 'react'
import Styles from './styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <section>
       <div>
        <div>
          <h3>Bem vindo de volta!</h3>
          <form className={Styles.form}>
            <div>
              <input type="email" name="email" placeholder="e-mail"></input>
            </div>
            <div>
              <input type="password" name="password" placeholder="senha"></input>
            </div>
            <div>
              <button>Entrar</button>
            </div>
            <div>
              <label>Esqueceu a senha? <a href="#">Recupere aqui</a></label>
            </div>
          </form>
        </div>
       </div>
      </section>
    </div>
  )
}

export default Login
