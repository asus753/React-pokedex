import React from 'react'
import { useParams } from 'react-router-dom'
import {useFetchReducer} from '../../hooks/useFetchWithCache.js'
import pokeAPI from '../../pokeAPI.js'
import { Loading } from '../general/Loading.jsx'
import {Alert, Card} from 'react-bootstrap'
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
      <div style={{textAlign : 'center', }}>
        <h1>{move.name} ({move.id})</h1>
        <p>{move.description.text} <br></br><small>(version : {move.description.version})</small></p>
        <div style={{display : 'flex'}}>
          <Card style={{width : '30rem', marginRight : '1rem'}} border='info'>
            <Card.Body>
              <Card.Title>Move stats</Card.Title>
              <ul style={{textAlign: 'initial'}}>
                <li><strong>Damage class: </strong>{move.damageClass}</li>
                <li><strong>Type: </strong>{move.type}</li>
                <li><strong>Accuracy: </strong>{move.accuracy}</li>
                <li><strong>PP: </strong>{move.pp}</li>
                <li><strong>Power: </strong>{move.power}</li>
              </ul>
            </Card.Body>
          </Card>
          <Card border='info' style={{width : '100%'}}>
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <p>This movement was introduced in <strong>"{move.generation}"</strong></p>
              <p><strong>Effect description: </strong>{move.effect}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
  return null
}
