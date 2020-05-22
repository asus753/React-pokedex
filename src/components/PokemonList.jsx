import React from 'react'
import {ListGroup, Spinner} from 'react-bootstrap'
import pokeAPI from '../pokeAPI.js'
import { useFetchReducer } from '../hooks/useSimpleFetch.js'
import { Link } from 'react-router-dom'


export const ContainerCards = ({page}) => {
  const {data , error, loading} = useFetchReducer(pokeAPI.search,getPageParameter(page))

  
  return (
    <ListGroup style={{textAlign : 'center'}}>
      {loading && <ListGroup.Item disabled>
          <Spinner animation="grow"/>
        </ListGroup.Item>}
      {data && data.results.map((pokemon, idx) => {
        return <Link key={idx} to={`/pokemon/${pokemon.name}`}>
          <ListGroup.Item action>{pokemon.name}</ListGroup.Item>
        </Link>
        
      })}
      {error && <ListGroup.Item variant="danger">{error}</ListGroup.Item>}
    </ListGroup>
  )
}

const getPageParameter = (numberPage) => {
  const POKEMONS_PER_PAGE = 20

  return `pokemon/?offset=${POKEMONS_PER_PAGE * (numberPage - 1)}&limit=${POKEMONS_PER_PAGE}`
}