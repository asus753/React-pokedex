import { CacheContext } from '../cacheContext.js'
import { useReducer, useEffect, useContext} from 'react'


const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
  const { type, payload } = action

  switch(type){
    case 'LOAD' : 
      return {...state, loading: true, data: null, error: null}
    case 'SUCCESS' : 
      return {...state, loading : false, data : payload, error : null}
    case 'FAILURE' : 
      return {...state, loading : false, data : null, error : payload}
    default : 
      return state
  }
}

export const useFetchReducer = (fetchResource, URLparameter) => {
  const cache = useContext(CacheContext)
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type : 'LOAD'})
      try{
        const resource = await fetchResource(URLparameter)
        dispatch({type : 'SUCCESS', payload : resource})
        cache.dispatch({type : 'SET_CACHE', payload : {key : URLparameter, value : resource}}) 
      }catch(error){
        dispatch({type : 'FAILURE', payload : error.message})
      }
    }

  
    if(cache.state?.[URLparameter]){
      dispatch({type: 'SUCCESS', payload : cache.state[URLparameter]})
      return
    }else{
      fetchData()
    }
    
  },[fetchResource,URLparameter,cache])

  return state
}

