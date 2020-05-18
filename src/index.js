import ReactDOM from 'react-dom'
import React from 'react'
//import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"
import { Header } from './components/header.jsx'
import { ContainerCards } from './components/cards.jsx'
import { Container } from 'react-bootstrap'
import { Paginator } from './components/paginator.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.render(<Container fluid>
    <Header/>
    <Paginator/>
    <ContainerCards/>
  </Container>, 
  document.getElementById('root')
)