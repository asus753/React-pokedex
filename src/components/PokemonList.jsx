import React from 'react'
import {ListGroup, Spinner} from 'react-bootstrap'
import pokeAPI from '../pokeAPI.js'
import { useFetch } from '../hooks/useSimpleFetch.js'


export const ContainerCards = ({page}) => {
  const {data , error, loading} = useFetch(pokeAPI.search,page)

  
  return (
    <ListGroup style={{textAlign : 'center'}}>
      {loading && <ListGroup.Item disabled>
          <Spinner animation="grow"/>
        </ListGroup.Item>}
      {data && data.results.map((pokemon, idx) => {
        return <ListGroup.Item action href={pokemon.url} key={idx}>{pokemon.name}</ListGroup.Item>
      })}
      {error && <ListGroup.Item variant="danger">{error}</ListGroup.Item>}
    </ListGroup>
  )
}