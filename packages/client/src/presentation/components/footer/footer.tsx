import React from 'react'
import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
  return (
    <div className={Styles.footer}>
      <footer>
        <nav>
          <div>
            <ul>
              <a href="" data-uk-icon="twitter"></a>
              <a href="" data-uk-icon="facebook"></a>
              <a href="" data-uk-icon="youtube"></a>
              <a href="" data-uk-icon="linkedin"></a>
              <a href="" data-uk-icon="google"></a>
              <a href="" data-uk-icon="github"></a>
            </ul>
          </div>
        </nav>
      </footer>
    </div>
  )
}

export default Footer
