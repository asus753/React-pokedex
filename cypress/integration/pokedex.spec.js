/// <reference types="Cypress" />



describe('App test', () => {
  before(() => {
    cy.visit('http://localhost:5000')
  })

  describe('homepage', () => {

    describe('navbar', () => {

      it('renders the navbar conatiner component', () => {
        cy.get('nav').should('be.visible')
      })

      it('renders the brand and the links', () => {
        cy.get('nav').children('.navbar-brand')
          .should('have.text', 'Pokedex')
          .and('be.visible')
          .and('have.attr', 'href').and('eq', '/')

        cy.get('nav').children('#navbar').contains('pokemons')
          .should('be.visible')
          .and('have.attr', 'href').and('eq', '/pokemon')

        cy.get('nav').children('#navbar').contains('generations')
          .should('be.visible')
          .and('have.attr', 'href').and('eq', '/generation')
      })

      it('renders the search bar', () => {
        cy.get('nav').children('#navbar').children('form').should('be.visible')
        cy.get('nav').children('#navbar').children('form').children('input').should('be.visible')
        cy.get('nav').children('#navbar').children('form').children('button').should('be.visible').and('have.text', 'Search')
      })
    })

    describe('main buttons', () => {

      it('renders the main buttons container', () => {
        cy.get('#main-buttons').should('be.visible')
      })

      it('renders the buttons', () => {

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
})