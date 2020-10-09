import React from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from 'react-bootstrap'

export const Home = () => {
  return (
    <>
      <ButtonGroup className="w-100">
        <Link to='/pokemon' className="w-50">
          <Button variant="outline-dark" size='lg' block className="mt-3">Pokemons by name</Button>
        </Link>
        <Link to='/type' className="w-50">
          <Button variant="outline-dark" size='lg' block className="mt-3">Pokemons by type</Button>
        </Link>
      </ButtonGroup>
      <Link to='/move'>
        <Button variant="outline-dark" size='lg' block className="mt-3">Movements</Button>
      </Link>
      <Link to='/ability'>
        <Button variant="outline-dark" size='lg' block className="mt-3">Abilities</Button>
      </Link>
      <Link to='/generation'>
        <Button variant="outline-dark" size='lg' block className="mt-3">Generations</Button>
      </Link>
    </>
  )
}
