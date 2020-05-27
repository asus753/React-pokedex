import React, {useState} from 'react'
import { Alert } from 'react-bootstrap'
import  { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import pokeAPI from '../../pokeAPI.js'
import { Paginator } from '../general/Paginator.jsx'
import { Loading } from '../general/Loading.jsx'
import { List} from '../general/List.jsx'

export const ListAbilities = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [numberElements, setNumberElements] = useState(null)
  const {data , error, loading} = useFetchReducer(pokeAPI.search,getPageParameter(currentPage))

  if(data && !numberElements){
    setNumberElements(data.count)
  }

  return (
    <>
    {numberElements && (
      <div style={{textAlign : 'center'}}>
      <h3>There are a total of {numberElements} abilities</h3>
      <Paginator page={currentPage} changePage={setCurrentPage} totalElemnts={numberElements}></Paginator>
      </div>
    )}
    {loading && <Loading/>}
    {error && <Alert variant='danger'>{error}</Alert>}
    {data && <List listElements={data.results.map(pokemon => pokemon.name)} typeElement='ability'/>}
    </>
  )
}

const getPageParameter = (numberPage) => {
  const POKEMONS_PER_PAGE = 20

  return `ability/?offset=${POKEMONS_PER_PAGE * (numberPage - 1)}&limit=${POKEMONS_PER_PAGE}`
}
