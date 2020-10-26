/// <reference types="Cypress" />

describe('homepage', () => {
  before(() => {
    cy.visit(Cypress.config('baseUrl'))
  })

  context('main buttons panel', () => {

    it('renders the main buttons container', () => {
      cy.get('#main-buttons').should('be.visible')
    })

    it('renders the buttons with the corresponding href', () => {

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
  })
  
})
