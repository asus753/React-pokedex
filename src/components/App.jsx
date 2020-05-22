import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import React from 'react'
import { Header } from './header.jsx'
import { Pokedex } from './Pokedex.jsx'
import { Pokemon } from './Pokemon.jsx'
import { Move } from './Move.jsx'

export const App = () => (
  <Router>
    <Header/>
    
    <Switch>
      <Route path='/' exact>
        <Pokedex/>
      </Route>
      <Route path='/pokemon/:id' exact>
        <Pokemon/>
      </Route>
      <Route path='/move/:id' exact>
        <Move/>
      </Route>
    </Switch>
  </Router>
)