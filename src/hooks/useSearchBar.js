import { useReducer, useState, useEffect, useContext} from 'react'
import { CacheContext } from '../cacheContext.js'

const initialState = {founded : false, error : false, loading : false}

const fetchReducer = (state, action) => {
  const { type } = action

  switch(type){
    case 'LOAD' : 
      return {...state, founded : false, error : false, loading : true}
    case 'SUCCESS' : 
      return {...state, founded : true, error : false, loading : false}
    case 'FAILURE' : 
      return {...state, founded : false, error : 'pokemon not founded', loading : false}
    case 'CLEAR' : 
      return {...state, founded : false, error : false, loading : false}
    default : 
      return state
  }
}

export const useSearchBar = (fetchResource) => {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState(false)
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  const cache = useContext(CacheContext)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const resource = await fetchResource(`pokemon/${input}`)
        cache.dispatch({type : 'SET_CACHE', payload : {key : `pokemon/${input}`, value : resource}}) 
        dispatch({type : 'SUCCESS'})
        setSearch(false)
      }catch(error){
        dispatch({type : 'FAILURE'})
      }
    }

    if(search){
      dispatch({type : 'LOAD'})
      try{
        if(cache.state[`pokemon/${input}`]){
          dispatch({type : 'SUCCESS'})
          return
        }else{fetchData()}
      }catch(error){
        fetchData()
      }
    }
  }, [fetchResource, input, search, cache])

  const clearData = () => {
    dispatch({type : 'CLEAR'})
  }

  return {state, input, setInput, setSearch, clearData}
}