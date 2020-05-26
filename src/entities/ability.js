export default class Ability {
  /**
   * 
   * @param {Number} id 
   * @param {String} name 
   * @param {String} longEffectDescription 
   * @param {String} shortEffectDescription 
   * @param {{text : String, version : String}} description 
   * @param {String} generation 
   * @param {Array<String>} pokemons 
   */


  constructor(id,name,longEffectDescription, shortEffectDescription, description, generation, pokemons){
    this.id = id
    this.name = name
    this.longEffectDescription = longEffectDescription
    this.shortEffectDescription = shortEffectDescription
    this.description = {
      text : description.text,
      version : description.version
    }
    this.generation = generation
    this.pokemons = pokemons
  }
}