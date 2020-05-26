export default class Generation {
  /**
   * 
   * @param {String} name 
   * @param {Number} id 
   * @param {String} mainRegion 
   * @param {Array<String>} abilities 
   * @param {Array<String>} moves 
   * @param {Array<String>} pokemons 
   * @param {Array<String>} types 
   */

  constructor(name, id, mainRegion, abilities, moves, pokemons, types){
    this.name = name
    this.id = id
    this.mainRegion = mainRegion
    this.abilities = abilities
    this.moves = moves
    this.pokemons = pokemons
    this.types = types
  }
}