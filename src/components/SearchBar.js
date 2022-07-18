import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import NavbarContext from '../context/NavbarContext';
import styles from '../styles/SearchBar.module.css'

//Separate searchbar component, used for conditional display 
const SearchBar = () => {
  const { query, setQuery } = useContext(NavbarContext);

  return (
        <Form 
          onSubmit={(event) => event.preventDefault()}
        >
          <FormControl  
            className={styles.SearchBar}
            type="search" 
            placeholder="Search posts" 
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>
  )
}

export default SearchBar;