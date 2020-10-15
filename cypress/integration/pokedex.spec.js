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

    
  })
})