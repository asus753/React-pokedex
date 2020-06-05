import React from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from 'react-bootstrap'

export const Home = () => {
  return (
    <>
     <ButtonGroup style={{width : '100%'}}>
     <Link to='/pokemon' style={{width : '50%'}}>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Pokemons by name</Button>
      </Link>
      <Link to='/type' style={{width : '50%'}}>
        <Button variant="outline-dark" size='lg' block style={{marginTop : '1rem'}}>Pokemons by type</Button>
     </Link>
     </ButtonGroup>
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
