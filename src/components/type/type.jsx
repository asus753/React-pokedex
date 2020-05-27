import React from 'react'
import { Loading } from '../general/Loading.jsx'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Alert, Card, Accordion } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { mapearType } from '../../mappers/type.js'
import { Link } from 'react-router-dom'

export const Type = () => {
  const { id } = useParams()
  const { data, error, loading} = useFetchReducer(pokeAPI.search, `type/${id}`)


  if(data){
    const type = mapearType(data)
    return (<>
      <h1 style={{textAlign : 'center'}}>{type.name} ({type.id})</h1>
      <div style={{display : 'flex', textAlign : 'center', marginTop : '1rem'}}>
        <Card border='info' style={{marginRight : '1rem', width : 'auto'}}>
          <Card.Body>
            <Card.Title>Type info</Card.Title>
            <p>
              this type of pokemon was introduced in <strong>{type.generation}</strong>, there 
              are {type.pokemons.length} pokemons of the same, exist {type.moves.length} moves for this 
              type {type.moveDamageClass && `and the class of damage inflicted is ${type.moveDamageClass}`}
            </p>
          </Card.Body>
        </Card>
        <Card border='info' style={{width : '-webkit-fill-available'}}>
          <Card.Body>
            <Card.Title>Damage relations</Card.Title>
            <ul style={{textAlign : 'initial'}}>
              <li>Double damage from : {type.damageRelations.doubleDamageFrom.map(typeName => <Link to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
              <li>Double damage to : {type.damageRelations.doubleDamegeTo.map(typeName => <Link to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
              <li>Half damage from : {type.damageRelations.halfDamagefrom.map(typeName => <Link to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
              <li>Half damage to : {type.damageRelations.halfDamageTo.map(typeName => <Link to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
              <li>No damage from : {type.damageRelations.noDamageFrom.map(typeName => <Link to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
              <li>No damage to : {type.damageRelations.noDamageTo.map(typeName => <Link to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
            </ul>
          </Card.Body>
        </Card>
      </div>

      <Accordion style={{marginTop : '1rem', textAlign : 'center'}}>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0'>pokemons of this type</Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <ul style={{columns : '2', textAlign : 'initial'}}>
                {type.pokemons.map(pokemon => (
                  <li><Link to={`/pokemon/${pokemon}`}><strong>{pokemon}</strong></Link></li>
                ))}
              </ul>
            </Card.Body>
          </Accordion.Collapse>  
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='1'>moves of this type</Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <ul style={{columns : '2', textAlign : 'initial'}}>
                {type.moves.map(move => (
                  <li><Link to={`/move/${move}`}><strong>{move}</strong></Link></li>
                ))}
              </ul>
            </Card.Body>
          </Accordion.Collapse>  
        </Card> 
      </Accordion>  
    </>)
  }
  if(loading){return <Loading/>}
  if(error){return <Alert variant='danger'>{error}</Alert>}

  return null
}

