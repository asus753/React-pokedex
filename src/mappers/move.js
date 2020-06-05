import Move from '../entities/move.js'

export const mapearMove = (dataMove) => {
  const {
    accuracy,
    damage_class : { name : damageClass},
    generation : {name : generation},
    id,
    name,
    power,
    pp,
    type : { name : type}
  } = dataMove
  const effect = getEffect(dataMove.effect_entries)
  const description = getDescription(dataMove.flavor_text_entries)


  return new Move(name, id, effect, damageClass, type, generation, pp, power, accuracy, description)
}

const getEffect = (effectEntries) => {
  let EFFECT

  effectEntries.forEach(effect => {
    if(effect.language.name === 'en' && EFFECT === undefined){
      EFFECT = effect.effect
    }
  })

  return EFFECT
}

const getDescription = (descriptionEntries) => {
  let DESCRIPTION

  if(descriptionEntries.length !== 0){
    descriptionEntries.forEach(description => {
      if(description.language.name === 'en' && !DESCRIPTION){
        DESCRIPTION = {
          text : description.flavor_text,
          version : description.version_group.name
        }
      }
    })
  }else{
    DESCRIPTION = {
      text : 'This move dont provide a description',
      version : '""'
    }
  }


  return DESCRIPTION
}
