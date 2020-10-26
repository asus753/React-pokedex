/// <reference types="Cypress" />

describe('Type page', () => {
  const TYPE_ID = 1
  const TYPE_NAME = 'normal'

  before(() => {
    cy.stubAnyType()
    cy.visit(Cypress.config('baseUrl') + '/type/' + TYPE_NAME)
  })

  it('renders the name and id of the pokemon as tittle', () => {
    cy.get('h1')
      .should('contain.text', TYPE_NAME)
      .and('contain.text', TYPE_ID.toString())
  })

  it('renders the type info card', () => {
    cy.get('#type-info')
      .should('have.class', 'card').and('have.class', 'border-info').and('be.visible')

    cy.get('#type-info').children('.card-body').children('.card-title').should('have.text', 'Type info')
    cy.get('#type-info').children('.card-body').children('p').should('not.be.empty')
  })

  it('renders the damage relations card', () => {
    cy.get('#damage-relations')
      .should('have.class', 'card').and('have.class', 'border-info').and('be.visible')

    cy.get('#damage-relations').children('.card-body').children('.card-title').should('have.text', 'Damage relations')
    cy.get('#damage-relations').children('.card-body').children('ul').children('li')
      .should('contain.text', 'Double damage from')
      .and('contain.text', 'Double damage to')
      .and('contain.text', 'Half damage to')
      .and('contain.text', 'No damage from')
      .and('contain.text', 'No damage to')
  })

  context('accordion', () => {
    it('renders the accordion container', () => {
      cy.get('.accordion').should('be.visible')
      cy.get('.accordion').children('div > .card')
        .should('have.length', 2)
    })

    it('shows the list of pokemons of the type', () => {
      cy.get('.accordion').contains('pokemons of this type').click()

      cy.get('.accordion').contains('pokemons of this type').parent('.card').children('.show').children('.card-body')
        .children('ul').children('li').each($el => {
          cy.get($el).children('a').should('have.attr', 'href').and('match', /^\/pokemon\/[a-zA-Z0-9_.-]*$/)
        })
    })

    it('shows the list of moves of the type', () => {
      cy.get('.accordion').contains('moves of this type').click()

      cy.get('.accordion').contains('moves of this type').parent('.card').children('.show').children('.card-body')
        .children('ul').children('li').each($el => {
          cy.get($el).children('a').should('have.attr', 'href').and('match', /^\/move\/[a-zA-Z0-9_.-]*$/)
        })

    })
  })
})