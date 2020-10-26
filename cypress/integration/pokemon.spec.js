/// <reference types="Cypress" />

describe('Pokemon page', () => {
  const POKEMON_ID = 1
  const POKEMON_NAME = 'bulbasaur'

  before(() => {
    cy.stubAnyPokemon()
    cy.visit(Cypress.config('baseUrl') + '/pokemon/' + POKEMON_ID)
  })

  it('renders the name and id of the pokemon as tittle', () => {
    cy.get('h1')
      .should('contain.text', POKEMON_NAME)
      .and('contain.text', POKEMON_ID.toString())
  })

  it('renders the image of the pokemon', () => {
    cy.get(`img[alt=${POKEMON_NAME}]`)
      .should('be.visible')
  })

  it('renders the description of pokemon with the height and weight', () => {
    cy.get('#description').should('be.visible')

    cy.get('#description').children('.card-body').children('.card-title')
      .should('have.text', 'Description')

    cy.get('#description').children('.card-body').children('.card-text').children('p')
      .should('have.length', 2)

    cy.get('#description').children('.card-body').children('.card-text').children('p')
      .then($elements => {
        cy.wrap($elements).its(1)
          .should('contain.text', 'Height:')
          .and('contain.text', 'Weight:')

        cy.wrap($elements).its(0).then($el => {
          expect($el.text()).have.length.least(1)
        })
      })
  })

  context('renders the accordion with the characteristics of the pokemon', () => {
    it('renders the accordion container', () => {
      cy.get('.accordion').should('be.visible')
      cy.get('.accordion').children('div > .card')
        .should('have.length', 4)
    })

    it('at first, they diffrents sections are not shown', () => {
      cy.get('.accordion').children('div > .card').each($el => {
        expect($el.children('.collapse').children('.card-body')).not.be.visible
      })
    })

    it('unfolds the accordion when is clicked, if is clicked one more time contracts', () => {
      cy.get('.accordion').children('div > .card').each($el => {
        
        cy.get($el.children('.card-header')).click().then(() => {
          cy.get($el.children('.collapsing').children('.card-body')).should('be.visible')
        })

        cy.get($el.children('.card-header')).click().then(() => {
          cy.get($el.children('.collapsing').children('.card-body')).should('not.be.visible')
        })
      })
    })

    it('shows the list of movements', () => {
      cy.get('.accordion').children('#moves').children('.card-header').click()

      cy.get('.accordion').children('#moves').children('.card-header')
        .should('have.text', 'Moves')

      cy.get('.accordion').children('#moves').children('.show').children('.card-body').children('ul').children('li')
        .should('have.length.at.least', 1)

      cy.get('.accordion').children('#moves').children('.show').children('.card-body').children('ul').children('li').each($el => {
        cy.get($el.children('a')).should('have.attr', 'href')
        cy.get($el).should('be.visible')
      })
    })

    it('shows the list of types', () => {
      cy.get('.accordion').children('#types').children('.card-header').click()

      cy.get('.accordion').children('#types').children('.card-header')
        .should('have.text', 'Types')
      
      cy.get('.accordion').children('#types').children('.show').children('.card-body').children('strong')
        .should('have.length.at.least', 1)
        .and('be.visible')

      cy.get('.accordion').children('#types').children('.show').children('.card-body').children('strong').each($el => {
        cy.get($el).children('a').should('have.attr', 'href')
      })
    })

    it('shows the list of abilities', () => {
      cy.get('.accordion').children('#abilities').children('.card-header').click()

      cy.get('.accordion').children('#abilities').children('.card-header')
        .should('have.text', 'Abilities')

      cy.get('.accordion').children('#abilities').children('.show').children('.card-body').children('strong')
        .should('have.length.at.least', 1)
        .and('be.visible')
      
      cy.get('.accordion').children('#abilities').children('.show').children('.card-body').children('strong').each($el => {
        cy.get($el).children('a').should('have.attr', 'href')
      })
    })

    it('shows the table of pokemon stats', () => {
      cy.get('.accordion').children('#stats').children('.card-header').click()

      cy.get('.accordion').children('#stats').children('.card-header')
        .should('have.text', 'Stats')
      
      cy.get('.accordion').children('#stats').children('.show').children('.card-body').children('.table-responsive').children('table')
        .should('exist')
        .and('be.visible')

      cy.get('.accordion').children('#stats').children('.show')
        .children('.card-body').children('.table-responsive').children('table')
        .children('thead').children('tr').children('th')
          .should('contain.text', 'hp')
          .and('contain.text', 'attack')
          .and('contain.text', 'defense')
          .and('contain.text', 'special-attack')
          .and('contain.text', 'special-defense')
          .and('contain.text', 'speed')

      cy.get('.accordion').children('#stats').children('.show')
        .children('.card-body').children('.table-responsive').children('table')
        .children('tbody').children('tr').children('td').each($td => {
          expect($td.text()).not.be.empty
        })
    })
  })
})