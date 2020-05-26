import React from 'react'
import { useParams } from 'react-router-dom'
import {useFetchReducer} from '../../hooks/useFetchWithCache.js'
import pokeAPI from '../../pokeAPI.js'
import { Loading } from '../general/Loading.jsx'
import {Alert, Card} from 'react-bootstrap'

export const Move = () => {
  
  const { id } = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`move/${id}`)

  if(loading){
    return <Loading/>
  }if(error){
    return <Alert variant='danger'>{error}</Alert>
  }if(data){
    const move = new MoveInfo(data)

    return (
      <div style={{textAlign : 'center', }}>
        <h1>{move.name} ({move.id})</h1>
        {typeof move.description === 'object' ? (
          <p>{move.description.flavor_text} <br></br><small>(version : {move.description.version_group.name})</small></p>
        ) : (<p>{move.description}</p>)}
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
              <p>This movement was introduced in <strong>"{move.introduced}"</strong></p>
              <p><strong>Effect description: </strong>{move.effect.effect}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
  return null
}

class MoveInfo {
  constructor(moveData){
    this.name = moveData.name
    this.id = moveData.id
    this.effect = getEffect(moveData.effect_entries)
    this.damageClass = moveData.damage_class.name
    this.type = moveData.type.name
    this.introduced = moveData.generation.name
    this.pp = moveData.pp
    this.power = moveData.power
    this.accuracy = moveData.accuracy
    this.description = getDescription(moveData.flavor_text_entries)
  }
}

const getEffect = (effectEntries) => {
  let EFFECT

  effectEntries.forEach(effect => {
    if(effect.language.name === 'en' && EFFECT === undefined){
      EFFECT = effect
    }
  })

  return EFFECT
}

const getDescription = (descriptionEntries) => {
  let DESCRIPTION

  if(descriptionEntries.length !== 0){
    descriptionEntries.forEach(description => {
      if(description.language.name === 'en' && !DESCRIPTION){
        DESCRIPTION = description
      }
    })
  }else{
    DESCRIPTION = 'This move dont provide a description'
  }


  return DESCRIPTION
}