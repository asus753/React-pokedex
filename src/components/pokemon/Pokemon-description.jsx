import React from 'react'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import pokeAPI from '../../pokeAPI.js'
import { Loading } from '../general/Loading.jsx'

export const PokemonDescription = ({specieName}) => {
  const {data , error, loading} = useFetchReducer(pokeAPI.search,'pokemon-species/'.concat(specieName))

  
  if(loading){return <Loading/>}
  if(error){return <p><strong>This pokemon dont provide a description</strong></p>}
  if(data){return <p>{getDescriptionInEnglish(data.flavor_text_entries)}</p>}

  return null
}

const getDescriptionInEnglish = (descriptionList) => {
  let DESCRIPTION

  for(let idx = descriptionList.length - 1; idx >= 0; idx-- ){
    if(descriptionList[idx].language.name === 'en' && DESCRIPTION === undefined){
      DESCRIPTION = descriptionList[idx].flavor_text
    }
  }

  return DESCRIPTION
}
