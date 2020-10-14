//this hook is not used for anything because dont handle cache

import { useEffect, useReducer, useState} from 'react'

//fetch without reducer
export const useFetch = (fetchResource, URLparameter) => {
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
        const resource = await fetchResource(URLparameter)  
        setData(resource)
        setLoading(false)
      }catch(error){
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  },[URLparameter, fetchResource])

  return {data,error,loading}
}

//useFetch with useReducer
const initialState = {loading : false, data : null, error : null}

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
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type : 'LOAD'})
      try{
        const resource = await fetchResource(URLparameter)
        dispatch({type : 'SUCCESS', payload : resource}) 
      }catch(error){
        dispatch({type : 'FAILURE', payload : error.message})
      }
    }
    fetchData()
  },[URLparameter, fetchResource])

  return state
}
