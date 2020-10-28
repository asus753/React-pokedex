/// <reference types="Cypress" />

import ability from '../fixtures/stench.ability.json'

describe('ability page', () => {
  const ABILITY_ID = ability.id
  const ABILITY_NAME = ability.name
  const ABILITY_GENERATION = ability.generation.name
  const ABILITY_DESCRIPTION = ability.effect_entries[1].effect

  before(() => {
    cy.stubAnyAbility()
    cy.visit(Cypress.config('baseUrl') + '/ability/' + ABILITY_ID)
  })

  it('renders the name and id of the ability as tittle', () => {
    cy.get('h1')
      .should('contain.text', ABILITY_NAME)
      .and('contain.text', ABILITY_ID.toString())
  })

  it('renders the versions of the ability', () => {
    cy.get('small').contains('version').should('be.visible')
  })

  context('ability info card', () => {

    it('renders the card container', () => {
      cy.get('#ability-info').should('be.visible')
    })

    it('renders the tittle', () => {
      cy.get('#ability-info').children('.card-body').children('.card-title')
        .should('have.text', 'Ability info')
    })

    it('renders the generation when the ability was introduced', () => {
      cy.get('#ability-info').children('.card-body').children('.card-text').children('p')
        .should('contain.text', ABILITY_GENERATION)
    })

    it('renders the effect description', () => {
      cy.get('#ability-info').children('.card-body').children('.card-text').children('p')
        .should('contain.text', ABILITY_DESCRIPTION)
    })
  })

  it('renders the list of pokemons that possess the ability', () => {
    cy.get('#pokemons').children('h3').should('be.visible')

    cy.get('#pokemons').children('ul').children('li').each($pokemon => {
      cy.get($pokemon).children('a')
        .should('be.visible')
        .and('have.attr', 'href', '/pokemon/' + $pokemon.text())
    })
  })
})