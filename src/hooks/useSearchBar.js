import { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { CacheContext } from '../cacheContext.js'

export const useSearchBar = (fetchResource, URLparameter) => {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('NULL')
  const cache = useContext(CacheContext)
  const history = useHistory()

  const fetchPokemon = async () => {
    try{
      setSearch('LOADING')
      const resource = await fetchResource(URLparameter.concat(input.toLowerCase()))
      cache.dispatch({type : 'SET_CACHE', payload : {key : URLparameter.concat(input.toLowerCase()), value : resource}})
      restart()
      history.replace('/pokemon/'.concat(input.toLowerCase()),{})
    }catch(error){
      setSearch('NOT FOUNDED')
    }
  }
  const restart = () => {
    setSearch('NULL')
  }

  return {search, input, setInput, fetchPokemon}
}