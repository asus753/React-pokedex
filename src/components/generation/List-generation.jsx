import React from 'react'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { List } from '../general/List.jsx'
import { Loading } from '../general/Loading.jsx'
import { Alert } from 'react-bootstrap'

export const ListGenerations = () => {
  const {data , error, loading} = useFetchReducer(pokeAPI.search,'generation')

  if(loading){return <Loading/>}
  if(error){return <Alert variant='danger'>{error}</Alert>}
  if(data){
    return (<List typeElement='generation' listElements={data.results.map(generation => generation.name)}/>)
  }

  return null
}