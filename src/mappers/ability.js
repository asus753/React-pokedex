import Ability from '../entities/ability.js'

export const mapearAbility = (dataAbility) => {
  const {
    id,
    name,
    generation : {name : generation}
  } = dataAbility
  const {longEffectDescription, shortEffectDescription} = getEffectDescription(dataAbility.effect_entries)
  const description = getDescription(dataAbility.flavor_text_entries)
  const pokemons = dataAbility.pokemon.map(pokemon => pokemon.pokemon.name)

  return new Ability(id, name, longEffectDescription, shortEffectDescription, description, generation, pokemons)
}

const getDescription = (descriptions) => {
  let textDescription, versionDescription

  descriptions.forEach(description => {
    if(description.language.name === 'en' && !textDescription && !versionDescription){
      textDescription = description.flavor_text
      versionDescription = description.version_group.name
    }
  })

  return {
    text : textDescription,
    version : versionDescription
  }
}

const getEffectDescription = ( descriptions ) => {
  let longDescription, shortDescription

  descriptions.forEach(description => {
    if(description.language.name === 'en' && !longDescription && !shortDescription){
      longDescription = description.effect
      shortDescription = description.short_effect
    }
  })

  return {
    longEffectDescription : longDescription,
    shortEffectDescription : shortDescription 
  }

}