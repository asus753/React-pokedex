/// <reference types="Cypress" />

describe('Move page', () => {
  const MOVE_ID = 1
  const MOVE_NAME = 'pound'

  before(() => {
    cy.stubAnyMove()
    cy.visit(Cypress.config('baseUrl') + '/move/' + MOVE_ID)
  })

  it('renders the name and id of the pokemon as tittle', () => {
    cy.get('h1')
      .should('contain.text', MOVE_NAME)
      .and('contain.text', MOVE_ID.toString())
  })

  it('renders the version of the move', () => {
    cy.get('small').contains('version')
      .should('be.visible')
  })

  it('renders the move stats card', () => {
    cy.get('#stats').should('be.visible')

    cy.get('#stats').children('.card-body').children('.card-title')
      .should('have.text', 'Move stats')
    
    cy.get('#stats').children('.card-body').children('ul').children('li')
      .should('contain.text', 'Damage class')
      .and('contain.text', 'Type')
      .and('contain.text', 'Accuracy')
      .and('contain.text', 'PP')
      .and('contain.text', 'Power')
  })

  it('renders the description card', () => {
    cy.get('#description').should('be.visible')

    cy.get('#description').children('.card-body').children('.card-title')
      .should('have.text', 'Description')

    cy.get('#description').children('.card-body').children('p')
      .should('contain.text', 'This movement was introduced in')
      .and('contain.text', 'Effect description')
  })
});