/// <reference types="Cypress" />

import type from '../fixtures/dragon.type.json'

describe('Type page', () => {
  const TYPE_ID = type.id
  const TYPE_NAME = type.name

  before(() => {
    cy.stubAnyType()
    cy.visit(Cypress.config('baseUrl') + '/type/' + TYPE_NAME)
  })

  it('renders the name and id of the type as tittle', () => {
    cy.get('h1')
      .should('contain.text', TYPE_NAME)
      .and('contain.text', TYPE_ID)
  })

  it('renders the type info card with the generation was introduced, the number of pokemons with the same, the number of movements for this type and the damage class inflicted by the movements', () => {
    cy.get('#type-info')
      .should('have.class', 'card').and('have.class', 'border-info').and('be.visible')

    cy.get('#type-info').children('.card-body').children('p')
      .should('contain.text', type.generation.name)
      .and('contain.text', type.pokemon.length)
      .and('contain.text', type.moves.length)
      .and('contain.text', type.move_damage_class.name)
  })

  it('renders the damage relations card', () => {
    cy.get('#damage-relations')
      .should('have.class', 'card').and('have.class', 'border-info').and('be.visible')

    cy.get('#damage-relations').children('.card-body').children('ul').children('li')
      .should('contain.text', 'Double damage from')
      .and('contain.text', 'Double damage to')
      .and('contain.text', 'Half damage to')
      .and('contain.text', 'No damage from')
      .and('contain.text', 'No damage to')

    Object.keys(type.damage_relations).forEach(damageRelation => {
      type.damage_relations[damageRelation].forEach(type => {
        cy.get('#damage-relations').children('.card-body').children('ul').children('li')
          .should('contain.text', type.name)
      })
    })
  })

  context('accordion', () => {
    it('renders the accordion container', () => {
      cy.get('.accordion').should('be.visible')
      cy.get('.accordion').children('div > .card')
        .should('have.length', 2)
    })

    context('shows the list of pokemons of the type', () => {
      before(() => {
        cy.get('#pokemons').children('.card-header').click()
      })

      it('all pokemons are shown', () => {
        type.pokemon.forEach(pokemon => {
          cy.get('#pokemons').children('.show')
            .should('contain.text', pokemon.pokemon.name)
        })
      })

      it('all pokemons haves a href that redirects to the pokemon page', () => {
        cy.get('#pokemons').children('.show').children('.card-body')
          .children('ul').children('li').each($pokemon => {
            cy.get($pokemon).children('a').should('have.attr', 'href', '/pokemon/' + $pokemon.text())
          })
      })
    })

    context('shows the list of moves of the type', () => {
      before(() => {
        cy.get('#moves').children('.card-header').click()
      })

      it('all moves are shown', () => {
        type.moves.forEach(move => {
          cy.get('#moves').children('.show')
            .should('contain.text', move.name)
        })
      })

      it('all moves haves a href that redirects to the move page', () => {
        cy.get('#moves').children('.show').children('.card-body')
          .children('ul').children('li').each($move => {
            cy.get($move).children('a').should('have.attr', 'href', '/move/' + $move.text())
          })
      })

    })
  })
})