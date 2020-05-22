import React from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Pokedex</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to='/'>Home</Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="pokemon" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  )
}
