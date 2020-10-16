/// <reference types="Cypress" />



describe('App test', () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"))
  })

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

  describe('homepage', () => {

    it('the navbar is rendered in the homepage', () => {
      cy.get('nav').should('be.visible')
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

  describe('pokemons page', () => {
    before(() => {
      cy.route2('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', {
        fixture: 'first-page-pokemons.json',
        headers: {
          'access-control-allow-origin': 'http://localhost:3000/pokemon'
        }
      }).as('firstpageofpokemons')

      cy.route2('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', {
        fixture: 'second-page-pokemons.json',
        headers: {
          'access-control-allow-origin': 'http://localhost:3000/pokemon'
        }
      })

      cy.visit('http://localhost:3000/pokemon')
    })

    it('the navbar is rendered in the list of pokemons', () => {
      cy.get('nav').should('be.visible')
    })

    describe('pagination bar', () => {
      it('the pagination component is rendered', () => {
        cy.get('#pagination').should('be.visible')
        cy.get('#pagination').children('.pagination').children('li').should('have.length.at.least', 3)
      })

      it('the first page is marked as active by default', () => {
        cy.get('.page-item').contains('1').parent('li').should('have.class', 'active')
      })

      describe('moves from the first to the second page', () => {
        before(() => {
          cy.get('.page-item').contains('2').click()
        })

        after(() => {
          cy.get('.page-item').contains('1').click()
        })

        it('the pagination bar still visible', () => {
          cy.get('#pagination').should('be.visible')
        })

        it('the second page is marked as active and the first is no longer marked as such', () => {
          cy.get('.page-item').contains('1').parent('li').should('not.have.class', 'active')
          cy.get('.page-item').contains('2').parent('li').should('have.class', 'active')
        })
      })
    })

    describe('renders the list of pokemons', () => {

      it('first page', () => {
        cy.get('#pokemons-list').should('be.visible')
        cy.get('#pokemons-list').children('a').each($el => {
          expect($el.attr('href')).be.eq('/pokemon/' + $el.text())
          expect($el).be.visible
          expect($el.children('button')).exist
        })
      })

      it('second page', () => {
        cy.get('#pokemons-list').should('be.visible')
        cy.get('#pokemons-list').children('a').each($el => {
          expect($el.attr('href')).be.eq('/pokemon/' + $el.text())
          expect($el).be.visible
          expect($el.children('button')).exist
        })
      })
    })


  })

})