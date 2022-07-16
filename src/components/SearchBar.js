import React, { useContext } from 'react'
import { Form, FormControl } from 'react-bootstrap';
import NavbarContext from '../context/NavbarContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const SearchBar = () => {
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { query, setQuery } = useContext(NavbarContext);

  return (
        <Form 
            inline ref={ref} 
            onSubmit={(event) => event.preventDefault()}
            onClick={() => setExpanded(expanded)} 
        >
        <FormControl  
            type="search" 
            placeholder="Search posts" 
            className="mx-auto"
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClick={() => setExpanded(expanded)} 
        />
        </Form>
  )
}

export default SearchBar;