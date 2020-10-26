import React from 'react'
import { useParams } from 'react-router-dom'
import {useFetchReducer} from '../../hooks/useFetchWithCache.js'
import pokeAPI from '../../pokeAPI.js'
import { Loading } from '../general/Loading.jsx'
import {Alert, Card, Row, Col} from 'react-bootstrap'
import { mapearMove } from '../../mappers/move.js'

export const Move = () => {
  
  const { id } = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`move/${id}`)

  if(loading){
    return <Loading/>
  }if(error){
    return <Alert variant='danger'>{error}</Alert>
  }if(data){
    const move = mapearMove(data)
    
    return (
      <div className="text-center">
        <h1>{move.name} ({move.id})</h1>
        <p>{move.description.text} <br></br><small>(version : {move.description.version})</small></p>
        <Row>
          <Col md={4} className='mt-3'>
            <Card border='info' className='h-100' id='stats'>
              <Card.Body>
                <Card.Title>Move stats</Card.Title>
                <ul className="text-left">
                  <li><strong>Damage class: </strong>{move.damageClass}</li>
                  <li><strong>Type: </strong>{move.type}</li>
                  <li><strong>Accuracy: </strong>{move.accuracy}</li>
                  <li><strong>PP: </strong>{move.pp}</li>
                  <li><strong>Power: </strong>{move.power}</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md className='mt-3'>
            <Card border='info' className='h-100' id='description'>
              <Card.Body>
                <Card.Title>Description</Card.Title>
                <p>This movement was introduced in <strong>"{move.generation}"</strong></p>
                <p><strong>Effect description: </strong>{move.effect}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  return null
}
