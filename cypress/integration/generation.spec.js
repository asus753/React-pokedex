/// <reference types="Cypress" />

import generation from '../fixtures/generation-vi.generation.json'

describe('generation page', () => {
  const GENERATION_ID = generation.id
  const GENERATION_NAME = generation.name
  
  before(() => {
    cy.stubAnyGeneration()
    cy.visit(Cypress.config('baseUrl') + '/generation/' + GENERATION_ID)
  })

  it('renders the name and id of the pokemon as tittle', () => {
    cy.get('h1')
      .should('contain.text', GENERATION_NAME)
      .and('contain.text', GENERATION_ID)
  })

  it('renders a card with the main region', () => {
    cy.get('#main-region').should('contain.text', generation.main_region.name)
  })

  it('all pokemons speceies added are shown', () => {
    cy.get('#species').children('.card-header').click()
    
    generation.pokemon_species.forEach(specie => {
      cy.get('#species').children('.show').should('contain.text', specie.name)
    })
  })

  context('moves added', () => {
    before(() => {
      cy.get('#moves').children('.card-header').click()
    })

    it('all moves added are shown', () => {
      generation.moves.forEach(move => {
        cy.get('#moves').children('.show').should('contain.text', move.name)
      })
    })

    it('every move have a href that redirects to the move page', () => {
      cy.get('#moves').children('.show').children('.card-body').children('ul').children('li')
        .each($move => {
          cy.get($move).children('a').should('have.attr', 'href', '/move/' + $move.text())
        })
    })
  })

  context('abilities added', () => {
    before(() => {
      cy.get('#abilities').children('.card-header').click()
    })

    it('all abilities added are shown', () => {
      generation.abilities.forEach(ability => {
        cy.get('#abilities').children('.show').should('contain.text', ability.name)
      })
    })

    it('every ability have a href that redirects to the ability page', () => {
      cy.get('#abilities').children('.show').children('.card-body').children('ul').children('li')
        .each($ability => {
          cy.get($ability).children('a').should('have.attr', 'href', '/ability/' + $ability.text())
        })
    })
  })

  context('types added', () => {
    before(() => {
      cy.get('#types').children('.card-header').click()
    })

    it('all abilities added are shown', () => {
      generation.types.forEach(type => {
        cy.get('#types').children('.show').should('contain.text', type.name)
      })
    })

    it('every type have a href that redirects to the type page', () => {
      cy.get('#types').children('.show').children('.card-body').children('ul').children('li')
        .each($type => {
          cy.get($type).children('a').should('have.attr', 'href', '/type/' + $type.text())
        })
    })
  })


});