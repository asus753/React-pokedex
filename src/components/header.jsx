import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar.jsx'


export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Pokedex</Navbar.Brand>
      <Nav className="mr-auto" as={Link} to='/'>
        Home
      </Nav>
      <SearchBar/>
  </Navbar>
  )
}
