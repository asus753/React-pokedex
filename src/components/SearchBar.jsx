import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import {Form, FormControl, Button, Spinner} from 'react-bootstrap'
import pokeAPI from '../pokeAPI.js'
import { useSearchBar } from '../hooks/useSearchBar.js'

export const SearchBar = () => {
  const {state : {founded, error, loading},input, setInput, setSearch, clearData} = useSearchBar(pokeAPI.search)

  return (
    <>
      <Form inline>
        <FormControl
          type="text"
          placeholder="pokemon"
          className="mr-sm-2"
          onChange={(event) => {
            founded && clearData()
            setInput(event.target.value)
          }}
          readOnly={loading ? true : false}
          value={input}/>

        {!loading ? (
          <Button variant="outline-info" onClick={() => {setSearch(true)}}>Search</Button>
        ) : (
          <Button variant="outline-info" disabled>
            <Spinner
              as='span'
              animation='grow'
              size='sm'
              role='status'
              aria-hidden='true'/>
              Loading...
          </Button>
        )}
      </Form>
      {founded && <Redirect to={`/pokemon/${input}`}/>}
      {error && alert(error)}
    </>
  )
}
