import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const Home = () => {
  return (
    <>
      <Link to='/pokemon'>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Pokemons</Button>
      </Link>
      <Link to='/type'>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Types of pokemons</Button>
     </Link>
      <Link to='/move'>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Movements</Button>
      </Link>
      <Link to='/ability'>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Abilities</Button>
      </Link>
      <Link to='/generation'>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Generations</Button>
      </Link>
    </>
  )
}