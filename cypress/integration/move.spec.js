/// <reference types="Cypress" />

import move from '../fixtures/pound.move.json'

describe('Move page', () => {
  const MOVE_ID = move.id
  const MOVE_NAME = move.name
  const MOVE_VERSION = move.flavor_text_entries[0].version_group.name
  const MOVE_EFFECT = move.effect_entries[0].effect
  const MOVE_GENARATION = move.generation.name
  const MOVE_STATS = {
    damageClass: move.damage_class.name,
    type: move.type.name,
    accuracy: move.accuracy,
    pp: move.pp,
    power: move.power
  }

  before(() => {
    cy.stubAnyMove()
    cy.visit(Cypress.config('baseUrl') + '/move/' + MOVE_ID)
  })

  it('renders the name and id of the pokemon as tittle', () => {
    cy.get('h1')
      .should('contain.text', MOVE_NAME)
      .and('contain.text', MOVE_ID)
  })

  it('renders the version of the move', () => {
    cy.get('small').contains('version')
      .should('be.visible').and('contain.text', MOVE_VERSION)
  })

  it('renders the move stats card', () => {
    cy.get('#stats').should('be.visible')

    cy.get('#stats').children('.card-body').children('.card-title')
      .should('have.text', 'Move stats')
    
    cy.get('#stats').children('.card-body').children('ul').children('li')
      .should('contain.text', MOVE_STATS.damageClass)
      .and('contain.text', MOVE_STATS.type)
      .and('contain.text', MOVE_STATS.accuracy)
      .and('contain.text', MOVE_STATS.pp)
      .and('contain.text', MOVE_STATS.power)
  })

  it('renders the description card with the generation was introduced and the effect description', () => {
    cy.get('#description').should('be.visible')

    cy.get('#description').children('.card-body').children('.card-title')
      .should('have.text', 'Description')

    cy.get('#description').children('.card-body').children('p')
      .should('contain.text', MOVE_GENARATION)
      .and('contain.text', MOVE_EFFECT)
  })
});