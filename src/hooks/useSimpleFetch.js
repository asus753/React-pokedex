import {useState, useEffect} from 'react'

export const useFetch = (fetchResource, searchParams) => {
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
        const resource = await fetchResource(searchParams)  
        setData(resource)
        setLoading(false)
      }catch(error){
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  },[])

  return {data,error,loading}
}