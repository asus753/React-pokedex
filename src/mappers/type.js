import Type from '../entities/type.js'

export const mapearType = (dataType) => {
  const {
    id,
    name,
    generation : {name : generation}
  } = dataType
  const moves = dataType.moves.map(move => move.name)
  const pokemons = dataType.pokemon.map(pokemonData => pokemonData.pokemon.name)
  const moveDamageClass = dataType.move_damage_class ? dataType.move_damage_class.name : ''
  const damageRelations = {
    double_damage_from : dataType.damage_relations.double_damage_from.map(type => type.name),
    double_damage_to : dataType.damage_relations.double_damage_to.map(type => type.name),
    half_damage_from : dataType.damage_relations.half_damage_from.map(type => type.name),
    half_damage_to : dataType.damage_relations.half_damage_to.map(type => type.name),
    no_damage_from : dataType.damage_relations.no_damage_from.map(type => type.name),
    no_damage_to : dataType.damage_relations.no_damage_to.map(type => type.name),
  }


  return new Type(
    id,
    name,
    generation,
    pokemons,
    moves,
    moveDamageClass,
    damageRelations
  )
}
