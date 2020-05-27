import React, {useState} from 'react'
import pokeAPI from '../../pokeAPI.js'
import { useFetchReducer } from '../../hooks/useFetchWithCache.js'
import { Paginator } from '../general/Paginator.jsx'
import { List } from '../general/List.jsx'
import { Loading } from '../general/Loading.jsx'
import { Alert } from 'react-bootstrap'

export const MovesList = () => {
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
        <h3>There are a total of {numberElements} moves</h3>
        <Paginator page={currentPage} changePage={setCurrentPage} totalElemnts={numberElements}></Paginator>
        </div>
      )
      }
      {loading && <Loading/>}
      {error && <Alert variant='danger'>{error}</Alert>}
      {data && <List listElements={data.results.map(move => move.name)} typeElement='move'/>}
    </>
  )
}

const getPageParameter = (numberPage) => {
  const MOVES_PER_PAGE = 20
  return `move/?offset=${MOVES_PER_PAGE * (numberPage - 1)}&limit=${MOVES_PER_PAGE}`
}
