import React,{useRef} from 'react'
import {Form, FormControl, Button, Spinner, Overlay} from 'react-bootstrap'
import pokeAPI from '../pokeAPI.js'
import { useSearchBar } from '../hooks/useSearchBar.js'

export const SearchBar = () => {
  const { input, setInput, search, fetchPokemon} = useSearchBar(pokeAPI.search, 'pokemon/')

  return (
    <Form inline onSubmit={(event) => {event.preventDefault(); fetchPokemon()}}>
      <FormControl
        type="text"
        placeholder="pokemon"
        className="mr-sm-2"
        value={input}
        isInvalid={search === 'NOT FOUNDED'}
        readOnly={search === 'LOADING' ? true : false}
        onChange={event => setInput(event.target.value)}
      />
      {search === 'LOADING' ? <ButtonLoading/> : (
        <Button variant="outline-info" type='submit'>Search</Button>
      )}
      
    </Form>
  )
}


const ButtonLoading = () => {
  return (
    <Button variant="outline-info" onClick={() => {}} disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  )
}
