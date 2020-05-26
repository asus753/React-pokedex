import React from 'react'
import { useParams } from 'react-router-dom'
import {useFetchReducer} from '../../hooks/useFetchWithCache.js'
import pokeAPI from '../../pokeAPI.js'
import { Loading } from '../general/Loading.jsx'
import {Alert, Card, Accordion} from 'react-bootstrap'
import { mapearGeneration } from '../../mappers/generation.js'
import { Link } from 'react-router-dom'

export const Generation = () => {
  const { id } = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`generation/${id}`)

  if(loading){return <Loading/>}
  if(error){return <Alert variant='danger'>{error}</Alert>}
  if(data){
    const generation = mapearGeneration(data)

    return <div style={{textAlign : 'center'}}>
      <h1>{generation.name} ({generation.id})</h1>
      <Card border='info' style={{margin : '1rem'}}>
        <Card.Body>Main region : <strong>{generation.mainRegion}</strong></Card.Body>
      </Card>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0'>Pokemons added</Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <ul style={{textAlign : 'initial', columns : '2'}}>
                {generation.pokemons.map(pokemon => <li><Link to={`/pokemon/${pokemon}`}><strong>{pokemon}</strong></Link></li>)}
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='1'>Moves added</Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <ul style={{textAlign : 'initial', columns : '2'}}>
                {generation.moves.map(move => <li><Link to={`/move/${move}`}><strong>{move}</strong></Link></li>)}
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='2'>Abilities added</Accordion.Toggle>
          <Accordion.Collapse eventKey='2'>
            <Card.Body>
              <ul style={{textAlign : 'initial', columns : '2'}}>
                {generation.abilities.map(ability => <li><Link to={`/ability/${ability}`}><strong>{ability}</strong></Link></li>)}
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='3'>Moves added</Accordion.Toggle>
          <Accordion.Collapse eventKey='3'>
            <Card.Body>
              <ul style={{textAlign : 'initial', columns : '2'}}>
                {generation.moves.map(move => <li><Link to={`/move/${move}`}><strong>{move}</strong></Link></li>)}
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='4'>Types added</Accordion.Toggle>
          <Accordion.Collapse eventKey='4'>
            <Card.Body>
              <ul style={{textAlign : 'initial', columns : '2'}}>
                {generation.types.map(type => <li><Link to={`/type/${type}`}><strong>{type}</strong></Link></li>)}
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  }


  return null
}