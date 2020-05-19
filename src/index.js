import ReactDOM from 'react-dom'
import React from 'react'
//import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"
import { Header } from './components/header.jsx'
import { Pokedex } from './components/Pokedex.jsx'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.render(<Container fluid>
    <Header/>
    <Pokedex/>
  </Container>, 
  document.getElementById('root')
)