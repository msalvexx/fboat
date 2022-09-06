import React from 'react'
import Styles from './styles.scss'

const SearchBar: React.FC = () => {
  return (
    <section className={Styles.searchBar}>
      <form>
        <span data-uk-search-icon></span>
        <input type="search" placeholder="Pesquise por artigos, autores ou palavras-chave..."/>
      </form>
    </section>
  )
}

export default SearchBar
