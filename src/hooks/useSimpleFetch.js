import {useState, useEffect} from 'react'

export const useFetch = (fetchResource, page) => {
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
        const resource = await fetchResource(getPageParameter(page))  
        setData(resource)
        setLoading(false)
      }catch(error){
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  },[page])

  return {data,error,loading}
}

const getPageParameter = (numberPage) => {
  const POKEMONS_PER_PAGE = 20

  return `pokemon/?offset=${POKEMONS_PER_PAGE * (numberPage - 1)}&limit=${POKEMONS_PER_PAGE}`
}