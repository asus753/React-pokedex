import { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { CacheContext } from '../cacheContext.js'

export const useSearchBar = (fetchResource) => {
  const URLparameter = 'pokemon/'
  const [input, setInput] = useState('')
  const [searchState, setSearchState] = useState(null)
  const cache = useContext(CacheContext)
  const history = useHistory()

  const fetchPokemon = async () => {
    try{
      setSearchState('LOADING')
      const resource = await fetchResource(URLparameter.concat(input.toLowerCase()))
      cache.dispatch({type : 'SET_CACHE', payload : {key : URLparameter.concat(input.toLowerCase()), value : resource}})
      endSearch()
      history.replace('/pokemon/'.concat(input.toLowerCase()),{})
    }catch(error){
      setSearchState('NOT FOUNDED')
    }
  }
  const endSearch = () => {
    setSearchState(null)
  }

  return {searchState, input, setInput, fetchPokemon}
}