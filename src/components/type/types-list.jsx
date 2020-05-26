import React from 'react'
import { List } from '../general/List.jsx'
import { Loading} from '../general/Loading.jsx'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Alert } from 'react-bootstrap'

export const TypesList = () => {
  const { data, error, loading} = useFetchReducer(pokeAPI.search, 'type')

  if(data){ return <List listElements={data.results.map(type => type.name)} typeElement='type'/> }
  if(error){ return <Alert variant='danger'>{error}</Alert> }
  if(loading){ return <Loading/> }

  return null
}