/// <reference types="Cypress" />

import ability from '../fixtures/stench.ability.json'

describe('ability page', () => {
  const ABILITY_ID = ability.id, ABILITY_NAME = ability.name, ABILITY_GENERATION = ability.generation.name

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

    it('renders the generation when the move was introduced', () => {
      cy.get('#ability-info').children('.card-body').children('.card-text').children('p')
        .should('contain.text', ABILITY_GENERATION)
    })

    it('renders the effect description', () => {
      cy.get('#ability-info').children('.card-body').children('.card-text').children('p')
        .should('contain.text', ability.effect_entries[1].effect)
    })
  })

  it('renders the list of pokemons that possess the ability', () => {
    cy.get('h3').contains('Pokemons with this ability').should('be.visible')

    cy.get('#pokemons').children('li').each($li => {
      cy.get($li).children('a')
        .should('be.visible')
        .and('have.attr', 'href').and('eq', '/pokemon/' + $li.text())
    })
  })
})