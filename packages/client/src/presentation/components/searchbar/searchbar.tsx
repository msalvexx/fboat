import React from 'react'
import Styles from './searchbar-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder: string
}

const SearchBar: React.FC<Props> = (props: Props) => {
  return (
    <section className={Styles.searchBar}>
      <form>
        <span data-uk-search-icon></span>
        <input {...props} type="search" placeholder={props.placeholder}/>
      </form>
    </section>
  )
}

export default SearchBar
