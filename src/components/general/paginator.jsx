import React from 'react'
import { Pagination } from 'react-bootstrap'
import { usePaginador } from '../../hooks/usePaginator.js'

export const Paginator = ({page, changePage, totalElemnts, elementsPerPage = 20}) => {
  const {currentPage,
    totalPages , 
    pages, 
    handleMoveLeft, 
    handleMoveRight, 
    handleClick
  } = usePaginador(totalElemnts, elementsPerPage, changePage, page)


  if (totalPages === 1){
    return null
  }else{
    return (
      <div className="justify-content-center mt-1 text-center" id="pagination">
        <Pagination className="justify-content-center">
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
