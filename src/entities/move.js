export default class Move {

  /**
   * 
   * @param {String} name 
   * @param {Number} id 
   * @param {String} effect 
   * @param {String} damageClass q
   * @param {String} type 
   * @param {String} generation 
   * @param {Number} pp 
   * @param {Number} power 
   * @param {Number} accuracy 
   * @param {text : String, version : String} description 
   */

  constructor(name, id, effect, damageClass, type, generation, pp, power, accuracy, description){


    this.name = name
    this.id = id
    this.effect = effect
    this.damageClass = damageClass
    this.type = type
    this.generation = generation
    this.pp = pp
    this.power = power
    this.accuracy = accuracy
    this.description = {
      text : description.text,
      version : description.version
    }
  }
}
