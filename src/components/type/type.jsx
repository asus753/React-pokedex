import React from 'react'
import { Loading } from '../general/Loading.jsx'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Alert, Card, Accordion, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { mapearType } from '../../mappers/type.js'
import { Link } from 'react-router-dom'

export const Type = () => {
  const { id } = useParams()
  const { data, error, loading } = useFetchReducer(pokeAPI.search, `type/${id}`)


  if(data){
    const type = mapearType(data)
    return (<>
      <h1 className="text-center">{type.name} ({type.id})</h1>
      
      <Row>
        <Col className="mt-3" md>
          <Card border='info' className="text-center">
            <Card.Body>
              <Card.Title>Type info</Card.Title>
              <p>
                this type of pokemon was introduced in <strong>{type.generation}</strong>, there 
                are {type.pokemons.length} pokemons of the same, exist {type.moves.length} moves for this 
                type {type.moveDamageClass && `and the class of damage inflicted is ${type.moveDamageClass}`}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mt-3" md>
          <Card border='info'>
            <Card.Body>
              <Card.Title className="text-center">Damage relations</Card.Title>
              <ul>
                <li>Double damage from : {type.damageRelations.doubleDamageFrom.map((typeName, idx) => <Link key={idx} to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
                <li>Double damage to : {type.damageRelations.doubleDamegeTo.map((typeName, idx) => <Link key={idx} to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
                <li>Half damage from : {type.damageRelations.halfDamagefrom.map((typeName, idx) => <Link key={idx} to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
                <li>Half damage to : {type.damageRelations.halfDamageTo.map((typeName, idx) => <Link key={idx} to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
                <li>No damage from : {type.damageRelations.noDamageFrom.map((typeName, idx) => <Link key={idx} to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
                <li>No damage to : {type.damageRelations.noDamageTo.map((typeName, idx) => <Link key={idx} to={'/type/'.concat(typeName)}>{typeName} </Link>)}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Accordion className="mt-3">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0' className="text-center">pokemons of this type</Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <ul style={{columns : '2'}}>
                {type.pokemons.map((pokemon, idx) => (
                  <li key={idx}><Link to={`/pokemon/${pokemon}`}><strong>{pokemon}</strong></Link></li>
                ))}
              </ul>
            </Card.Body>
          </Accordion.Collapse>  
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='1' className="text-center">moves of this type</Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <ul style={{columns : '2'}}>
                {type.moves.map((move, idx) => (
                  <li key={idx}><Link to={`/move/${move}`}><strong>{move}</strong></Link></li>
                ))}
              </ul>
            </Card.Body>
          </Accordion.Collapse>  
        </Card> 
      </Accordion>  
    </>)
  }
  if(loading){return <Loading/>}
  if(error){return <Alert variant='danger' className="mt-2">{error}</Alert>}

  return null
}

