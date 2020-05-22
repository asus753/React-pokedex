import React from 'react'
import { useFetchReducer } from '../hooks/useSimpleFetch.js'
import pokeAPI from '../pokeAPI.js'
import { useParams } from 'react-router-dom'
import {Loading} from './Loading.jsx'

export const PokemonDescription = () => {
  const { id } = useParams()
  const {data , error, loading} = useFetchReducer(pokeAPI.search,`pokemon-species/${id}`)

  if(loading){return <Loading/>}
  if(error){return <p><strong>This pokemon dont provide a description</strong></p>}
  if(data){return <p>{getDescription(data.flavor_text_entries)}</p>}

  return null
}

const getDescription = (descriptionList) => {
  let DESCRIPTION
  descriptionList.forEach(description => {
    if(description.language.name === 'en' && DESCRIPTION === undefined){
      DESCRIPTION = description.flavor_text
    } 
  })
  return DESCRIPTION
}