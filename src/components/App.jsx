import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import React from 'react'
import { Header } from './header.jsx'
import { Pokedex } from './pokemon/Pokemon-list.jsx'
import { Pokemon } from './pokemon/Pokemon.jsx'
import { Move } from './move/Move.jsx'
import {Home} from './Home.jsx'
import { MovesList } from './move/Moves-list.jsx'
import { TypesList } from './type/types-list.jsx'
import { Type} from './type/type.jsx'
import { CacheProvider } from '../cacheContext.js'
export const App = () => (
  <CacheProvider>
    <Router>
      <Header/>
      <Switch>
        <Route path='/' exact><Home/></Route>
        <Route path='/pokemon' exact><Pokedex/></Route>
        <Route path='/pokemon/:id' exact><Pokemon/></Route>
        <Route path='/move' exact><MovesList/></Route>
        <Route path='/move/:id' exact><Move/></Route>
        <Route path='/type' exact><TypesList/></Route>
        <Route path='/type/:id' exact><Type/></Route>
      </Switch>
    </Router>
  </CacheProvider>
)