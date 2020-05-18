import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'


export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Pokedex</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href='/'>Home</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="pokemon" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  )
}
