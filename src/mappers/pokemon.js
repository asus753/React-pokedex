import Pokemon from '../entities/pokemon.js'


export const mapearPokemon = (dataPokemon) => {
  const {
    name,
    id,
    sprites : { front_default : pictureURL },
    stats,
    height,
    weight
  } = dataPokemon
  const moves = getNames(dataPokemon.moves, 'move')
  const abilities = getNames(dataPokemon.abilities, 'ability')
  const type = getNames(dataPokemon.types, 'type')

  return new Pokemon(name, id, pictureURL, height, weight, type, moves, abilities, stats)
}

const getNames = (arrayElemnts, typeElement) => {
  return arrayElemnts.map(element => element[typeElement].name)
}