/// <reference types="Cypress" />

describe('homepage', () => {
  before(() => {
    cy.visit(Cypress.config('baseUrl'))
  })

  context('main buttons panel', () => {

    it('renders the main buttons container', () => {
      cy.get('#main-buttons').should('be.visible')
    })

    it('renders the links as buttons with the corresponding href', () => {

      cy.get('#main-buttons').contains('Pokemons by name').should('be.visible')
      cy.get('#main-buttons').contains('Pokemons by name').parent('a')
        .should('have.attr', 'href').and('eq', '/pokemon')

      cy.get('#main-buttons').contains('Pokemons by type').should('be.visible')
      cy.get('#main-buttons').contains('Pokemons by type').parent('a')
        .should('have.attr', 'href').and('eq', '/type')

      cy.get('#main-buttons').contains('Movements').should('be.visible')
      cy.get('#main-buttons').contains('Movements').parent('a')
        .should('have.attr', 'href').and('eq', '/move')

      cy.get('#main-buttons').contains('Abilities').should('be.visible')
      cy.get('#main-buttons').contains('Abilities').parent('a')
        .should('have.attr', 'href').and('eq', '/ability')

      cy.get('#main-buttons').contains('Generations').should('be.visible')
      cy.get('#main-buttons').contains('Generations').parent('a')
        .should('have.attr', 'href').and('eq', '/generation')

    })

    context('the buttons redirects correctly to the corresponding page', () => {

      beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
      })

      it('"Pokemons by name" redirects to the pokemons list', () => {
        cy.stubPokemonsList()
        cy.get('#main-buttons').contains('Pokemons by name').parent('a').click()

        cy.url().should('eq', Cypress.config('baseUrl') + '/pokemon')
      })

      it('"Pokemons by type" redirects to the types list', () => {
        cy.stubTypesList()
        cy.get('#main-buttons').contains('Pokemons by type').parent('a').click()

        cy.url().should('eq', Cypress.config('baseUrl') + '/type')
      })

      it('"Movements" redirects to the movements list', () => {
        cy.stubMovesList()
        cy.get('#main-buttons').contains('Movements').parent('a').click()

        cy.url().should('eq', Cypress.config('baseUrl') + '/move')
      })

      it('"Abilities" redirects to the abilities list', () => {
        cy.stubAbilitiesList()
        cy.get('#main-buttons').contains('Abilities').parent('a').click()

        cy.url().should('eq', Cypress.config('baseUrl') + '/ability')
      })

      it('"Generations" redirects to the abilities list', () => {
        cy.stubGenerationsList()
        cy.get('#main-buttons').contains('Generations').parent('a').click()

        cy.url().should('eq', Cypress.config('baseUrl') + '/generation')
      })

    })
  })
  
})
