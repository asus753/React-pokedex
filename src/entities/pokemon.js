export default class Pokemon {

  /**
   * 
   * @param {String} name 
   * @param {Number} id 
   * @param {String} pictureURL 
   * @param {Number} height 
   * @param {Number} weight 
   * @param {Array<String>} type 
   * @param {Array<String>} moves 
   * @param {Array<String>} abilities 
   * @param {Array<String>} stats 
   */

  constructor(name,id,pictureURL,height,weight,type,moves,abilities,stats){
    this.name = name
    this.id = id
    this.pictureURL = pictureURL
    this.height = height
    this.weight = weight
    this.type = type
    this.moves = moves
    this.abilities = abilities
    this.stats = stats
  }
}
