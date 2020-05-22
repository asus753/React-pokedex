import { useState } from 'react'

export const usePaginador = (totalRecords, pageLimit = 20, onPageChanged = () => {}, initialPage, pageNeighbours = 2) => {
  const totalPages = Math.ceil(totalRecords/pageLimit)
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';
  const [currentPage, setCurrentPage] = useState(initialPage)

  const fetchPageNumbers = () => {
    const totalNumbers = (pageNeighbours * 2) + 3
    const totalBlocks = totalNumbers + 2

    if(totalPages > totalBlocks){

      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = (totalPages - endPage) > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch(true){
        case (hasLeftSpill && !hasRightSpill) : {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break
        }
      }

      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }

  const goToPage = (page) => {
    const newPage = Math.max(0, Math.min(page, totalPages));
    setCurrentPage(newPage)
    onPageChanged(newPage)
  }

  const handleClick = evt => {
    evt.preventDefault()
    goToPage(evt.target.text)
  }

  const handleMoveLeft = evt => {
    evt.preventDefault()
    goToPage(currentPage - (pageNeighbours * 2) - 1)
  }

  const handleMoveRight = evt => {
    evt.preventDefault()
    goToPage(currentPage + (pageNeighbours * 2) + 1)
  }

  const pages = fetchPageNumbers()
  
  return {currentPage, totalPages ,pages, handleMoveLeft, handleMoveRight, handleClick}

}

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}
