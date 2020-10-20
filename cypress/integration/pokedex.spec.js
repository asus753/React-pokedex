/// <reference types="Cypress" />



describe('App test', () => {
  before(() => {
    cy.goToBaseUrl()
  })

  describe('pokemons list page', () => {
    before(() => {
      cy.route2('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', {
        fixture: 'first-page-pokemons.json',
        headers: {
          'access-control-allow-origin': 'http://localhost:3000/pokemon'
        }
      }).as('firstPageOfPokemons')

      cy.route2('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', {
        fixture: 'second-page-pokemons.json',
        headers: {
          'access-control-allow-origin': 'http://localhost:3000/pokemon'
        }
      }).as('secondPageOfPokemons')

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
        cy.get('.page-item').contains('2').click()

        cy.get('#pokemons-list').should('be.visible')
        cy.get('#pokemons-list').children('a').each($el => {
          expect($el.attr('href')).be.eq('/pokemon/' + $el.text())
          expect($el).be.visible
          expect($el.children('button')).exist
        })
      })
    })


  })

  describe('pokemon page', () => {
    before(() => {
      cy.route2('https://pokeapi.co/api/v2/pokemon/bulbasaur', {
        fixture: 'bulbasaur-pokemon.json',
        headers: {
          'access-control-allow-origin': 'http://localhost:3000/pokemon/bulbasaur'
        }
      }).as('bulbasaurPokemon')
    })
  })
})
