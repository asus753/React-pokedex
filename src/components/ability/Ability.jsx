import React from 'react'
import { useParams, Link } from 'react-router-dom'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Alert, Card } from 'react-bootstrap'
import { Loading } from '../general/Loading.jsx'
import { mapearAbility } from '../../mappers/ability.js'

export const Ability = () => {
  const {id} = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`ability/${id}`)

  if(loading){return <Loading/>}

  if(error){return <Alert variant='danger'>{error}</Alert>}

  if(data){
    const ability = mapearAbility(data)

    return (
      <div className="text-center">
        <h1>{ability.name} ({ability.id})</h1>
        <p>{ability.description.text}<br/><small>(version : {ability.description.version})</small></p>
        <Card border="info" className="m-3">
          <Card.Body>
            <Card.Title>Ability info</Card.Title>
            <Card.Text as='label'>
              <p>This ability was introduced in the <strong>{ability.generation}</strong></p>
              <p><strong>Effect description: </strong>{ability.longEffectDescription}</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <h3>Pokemons with this ability</h3>
        <ul className="list-group list-group-flush mt-3 w-100">
          {ability.pokemons.map((pokemon, idx) => <li className='list-group-item' key={idx}>
            <Link to={`/pokemon/${pokemon}`}><strong>{pokemon}</strong></Link>
          </li>)}
        </ul>
      </div>
    )
  }

  return null
}
