export default class TypePokemon {
  /**
   * @param {Number} id
   * @param {String} name
   * @param {String} generation 
   * @param {Array<String>} pokemons 
   * @param {Array<String>} moves 
   * @param {String} moveDamageClass 
   * @param {Object} damageRelations 
   */

  constructor(id,name,generation = '', pokemons, moves, moveDamageClass, damageRelations){
    this.id = id
    this.name = name
    this.generation = generation
    this.pokemons = pokemons
    this.moves = moves
    this.moveDamageClass = moveDamageClass
    this.damageRelations = {
      doubleDamageFrom : damageRelations.double_damage_from,
      doubleDamegeTo : damageRelations.double_damage_to,
      halfDamagefrom : damageRelations.half_damage_from,
      halfDamageTo : damageRelations.half_damage_to,
      noDamageFrom : damageRelations.no_damage_from,
      noDamageTo : damageRelations.no_damage_to,
    }
  }
}