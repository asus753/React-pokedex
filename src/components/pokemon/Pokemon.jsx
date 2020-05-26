import React from 'react'
import { useParams, Link } from 'react-router-dom'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Alert, Accordion, Card, Table } from 'react-bootstrap'
import { Loading } from '../general/Loading.jsx'
import { PokemonDescription } from './Pokemon-description.jsx'

export const Pokemon = () => {
  const { id } = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`pokemon/${id}`)

  if(loading){return <Loading/>}

  if(error){return <Alert variant='danger'>{error}</Alert>}

  if(data){
    const pokemon = new PokemonInfo(data)
    
    return (
      <div style={{textAlign : 'center', }}>
        <h1>{pokemon.name} ({pokemon.id})</h1>
        {/* {pokemon.pictureURL ? <img src={pokemon.pictureURL} alt={pokemon.name} height='500px' width='500px'></img> : <p><strong>This pokemon dont provide a image</strong></p>}
        <PokemonDescription/> */}

        <div style={{display : 'flex', alignItems : 'center', margin : '1rem'}}>
          {pokemon.pictureURL ? <img src={pokemon.pictureURL} alt={pokemon.name} height='50%' width='50%'></img> : <p style={{width : '50%'}}><strong>This pokemon dont provide a image</strong></p>}
          <Card border="info" style={{ width: '50%' }}>
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text as='span'>
                <PokemonDescription/>
                <p>Height: <strong>{pokemon.height}</strong>, Weight: <strong>{pokemon.weight}</strong></p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0'>Moves</Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <ul style={{columns : '2', textAlign : 'initial'}}>
                  {pokemon.moves.map((move, idx) => <li key={idx}>
                    <Link to={`/move/${move.name}`}><strong>{move.name}</strong></Link>
                  </li>)}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='1'>Types</Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                {pokemon.type.map((type,idx) => <strong key={idx}><Link to={`type/${type.name}`}>{type.name}</Link><br/></strong>)}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='2'>Abilities</Accordion.Toggle>
            <Accordion.Collapse eventKey='2'>
              <Card.Body>
                {pokemon.abilities.map((ability, idx) => <strong key={idx}>
                    <Link to={`ability/${ability.name}`}>{ability.name}</Link><br/>
                </strong>)}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='3'>Stats</Accordion.Toggle>
            <Accordion.Collapse eventKey='3'>
              <Card.Body>
                <Table striped bordered hover size="sm">
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

class PokemonInfo {
  constructor(pokemonData){
    this.name = pokemonData.name
    this.id = pokemonData.id
    this.pictureURL = pokemonData.sprites.front_default
    this.height = pokemonData.height
    this.weight = pokemonData.weight
    this.type = pokemonData.types.map(type => type.type)
    this.moves = pokemonData.moves.map(move => move.move)
    this.abilities = pokemonData.abilities.map(ability => ability.ability)
    this.stats = pokemonData.stats
  }
}