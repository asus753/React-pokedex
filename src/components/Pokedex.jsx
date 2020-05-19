import { Paginator } from './paginator.jsx'
import { ContainerCards } from './PokemonList.jsx'
import React,{useState} from 'react'

export const Pokedex = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
      <Paginator page={currentPage} changePage={setCurrentPage}></Paginator>
      <ContainerCards page={currentPage}></ContainerCards>
    </>
  )
}
