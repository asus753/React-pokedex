import React from 'react'
import {Form, FormControl, Button, Spinner} from 'react-bootstrap'
import pokeAPI from '../pokeAPI.js'
import { useSearchBar } from '../hooks/useSearchBar.js'

export const SearchBar = () => {
  const { input, setInput, searchState, fetchPokemon} = useSearchBar(pokeAPI.search)

  return (
    <Form inline onSubmit={(event) => {event.preventDefault(); fetchPokemon()}} className="flex-nowrap">
      <FormControl
        type="text"
        placeholder="pokemon"
        className="mr-2"
        value={input}
        isInvalid={searchState === 'NOT FOUNDED'}
        readOnly={searchState === 'LOADING'}
        onChange={event => setInput(event.target.value)}
      />
      {searchState === 'LOADING' ? 
        <ButtonLoading/> :
        <Button variant="outline-info" type='submit'>Search</Button>
      }
    </Form>
  )
}

//cleans hooks, test with cypress


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
