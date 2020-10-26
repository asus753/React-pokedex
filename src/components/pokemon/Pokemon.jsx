import React from 'react'
import { useParams, Link } from 'react-router-dom'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Alert, Accordion, Card, Table, Row, Col } from 'react-bootstrap'
import { Loading } from '../general/Loading.jsx'
import { PokemonDescription } from './Pokemon-description.jsx'
import { mapearPokemon} from '../../mappers/pokemon.js'

export const Pokemon = () => {
  const { id } = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`pokemon/${id}`)

  if(loading){return <Loading/>}

  if(error){return <Alert variant='danger'>{error}</Alert>}

  if(data){
    const pokemon = mapearPokemon(data)
    
    
    return (
      <div className="text-center">
        <h1>{pokemon.name} ({pokemon.id})</h1>

        <Row className="align-items-center justify-content-center mb-3">
          <Col md>
            {pokemon.pictureURL ? <img src={pokemon.pictureURL} alt={pokemon.name} height='100%' width='100%'></img> : <p><strong>This pokemon dont provide a image</strong></p>}
          </Col>
          <Col md>
            <Card border="info" id='description'>
              <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text as='span'>
                  <PokemonDescription specieName={pokemon.species}/>
                  <p>Height: <strong>{pokemon.height}</strong>, Weight: <strong>{pokemon.weight}</strong></p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Accordion>
          <Card id='moves'>
            <Accordion.Toggle as={Card.Header} eventKey='0'>Moves</Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <ul style={{columns : '2'}} className="text-left">
                  {pokemon.moves.map((move, idx) => <li key={idx}>
                    <Link to={`/move/${move}`}><strong>{move}</strong></Link>
                  </li>)}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card id='types'>
            <Accordion.Toggle as={Card.Header} eventKey='1'>Types</Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                {pokemon.type.map((type,idx) => <strong key={idx}><Link to={`/type/${type}`}>{type}</Link><br/></strong>)}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card id='abilities'>
            <Accordion.Toggle as={Card.Header} eventKey='2'>Abilities</Accordion.Toggle>
            <Accordion.Collapse eventKey='2'>
              <Card.Body>
                {pokemon.abilities.map((ability, idx) => <strong key={idx}>
                    <Link to={`/ability/${ability}`}>{ability}</Link><br/>
                </strong>)}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card id='stats'>
            <Accordion.Toggle as={Card.Header} eventKey='3'>Stats</Accordion.Toggle>
            <Accordion.Collapse eventKey='3'>
              <Card.Body>
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      {pokemon.stats.map((stat,idx) => <th key={idx} style={{width : `${100 / pokemon.stats.length}%`}}>
                        {stat.stat.name}
                      </th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {pokemon.stats.map((stat,idx) => <td key={idx}>{stat.base_stat}</td>)}
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    ) 
  }
  return null
}
