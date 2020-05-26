import Generation from '../entities/generation.js'

export const mapearGeneration = (dataGeneration) => {
  const {
    name,
    id,
    main_region : {name : mainRegion}
  } = dataGeneration
  const moves = getNames(dataGeneration.moves)
  const pokemons = getNames(dataGeneration.pokemon_species)
  const abilities = getNames(dataGeneration.abilities)
  const types = getNames(dataGeneration.types)

  return new Generation(name, id, mainRegion, abilities, moves, pokemons, types)
}

const getNames = (arrayElemnts) => {
  return arrayElemnts.map(element => element.name)
}