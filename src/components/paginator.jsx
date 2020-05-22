import React from 'react'
import { Pagination } from 'react-bootstrap'
import { usePaginador } from '../hooks/usePaginator.js'

export const Paginator = ({page, changePage}) => {
  const TOTAL_POKEMONS = 964
  const POKEMONS_PER_PAGE = 20
  const {currentPage,
    totalPages , 
    pages, 
    handleMoveLeft, 
    handleMoveRight, 
    handleClick
  } = usePaginador(TOTAL_POKEMONS, POKEMONS_PER_PAGE, changePage, page)


  if (totalPages === 1){
    return null
  }else{
    return (
      <div style={{justifyContent : 'center', marginTop : '1rem', textAlign : 'center'}}>
        <h3>There are a total of {TOTAL_POKEMONS} pokemons</h3>
        <Pagination style={{justifyContent : 'center'}}>
          {pages.map((page,idx) => {
            if(page === 'LEFT') return (
              <Pagination.Ellipsis key={idx} onClick={(event) => {handleMoveLeft(event)}}/>
            )
            if(page === 'RIGHT') return (
              <Pagination.Ellipsis key={idx} onClick={(event) => {handleMoveRight(event)}}/>
            )
            return (
              <Pagination.Item 
                key={idx}
                className={page === currentPage && 'active'}
                onClick={(event) => {handleClick(event)}}>
              {page}
              </Pagination.Item>
            )
          })}
        </Pagination>  
      </div>
    )
  }
}