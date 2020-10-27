/// <reference types="Cypress" />

import pokemons from '../fixtures/pokemons-list.json'

describe('pokemons list page', () => {
  const TOTAL_POKEMONS = pokemons.count

  before(() => {
    cy.stubPokemonsList()
    cy.visit(Cypress.config('baseUrl') + '/pokemon')
  })

  it('shows the total number of pokemon', () => {
    cy.get('h3').contains(TOTAL_POKEMONS).should('exist')
  })

  context('pagination bar', () => {

    beforeEach(() => {
      cy.stubPokemonsList()
    })

    it('the pagination component is rendered correctly', () => {
      cy.get('#pagination').should('be.visible')
      cy.get('#pagination').children('.pagination').children('li').should('have.length.at.least', 9)
    })

    it('the first page is marked as active by default', () => {
      cy.get('.page-item').contains('1').parent('li').should('have.class', 'active')
    })

    it('if I move to the second page, now this is marked and the first no more', () => {
      cy.stubPokemonsList()
      cy.get('.page-item').contains('2').click()

      cy.get('.page-item').contains('1').parent('li').should('not.have.class', 'active')
      cy.get('.page-item').contains('2').parent('li').should('have.class', 'active')
    })

    after(() => {
      cy.get('.page-item').contains('1').click()
    })
  })

  describe('renders the list of pokemons', () => {

    before(() => {
      cy.get('.page-item').contains('1').click()
    })

    beforeEach(() => {
      cy.stubPokemonsList()
    })

    it('renders the list with all pokemons provided in the first page', () => {
      cy.get('#pokemons-list').should('be.visible')

      pokemons.results.forEach(pokemon => {
        cy.get('#pokemons-list').children('a')
          .should('contain.text', pokemon.name)  
      })

      cy.get('#pokemons-list').children('a').each($pokemonLink => {
        cy.get($pokemonLink)
          .should('be.visible')
          .and('have.attr', 'href').and('eq', '/pokemon/' + $pokemonLink.text())
        
        cy.get($pokemonLink).children('button').should('have.class', 'list-group-item')
      })
    })

    it('renders the list with all pokemons provided in the second page', () => {
      cy.get('.page-item').contains('2').click()

      cy.get('#pokemons-list').should('be.visible')

      pokemons.results.forEach(pokemon => {
        cy.get('#pokemons-list').children('a')
          .should('contain.text', pokemon.name)  
      })

      cy.get('#pokemons-list').children('a').each($pokemonLink => {
        cy.get($pokemonLink)
          .should('be.visible')
          .and('have.attr', 'href').and('eq', '/pokemon/' + $pokemonLink.text())
        
        cy.get($pokemonLink).children('button').should('have.class', 'list-group-item')
      })
    })
  })


})