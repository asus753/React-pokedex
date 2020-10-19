/// <reference types="Cypress" />

Cypress.Commands.add('stubPokemonsList', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\?offset=[0-9]+&limit=[0-9]+$/
  }, {
    fixture: 'second-page.pokemon.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('pokemonsList')
})

Cypress.Commands.add('stubAnyPokemon', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\w+$/
  }, {
    fixture: 'bulbasaur.pokemon.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('anyPokemon')

  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/\w+$/
  }, {
    fixture: 'bulbasaur.pokemon-species.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('anyPokemonSpecies')
})

Cypress.Commands.add('stubTypes', () => {
  cy.route2('https://pokeapi.co/api/v2/type', {
    fixture: 'all-types.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('allTypesOfPokemons')
})

Cypress.Commands.add('stubAnyType', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/type\/\w+$/
  }, {
    fixture: 'normal.type.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('anyType')
})

Cypress.Commands.add('stubMovesList', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/move\/\?offset=[0-9]+&limit=[0-9]+$/
  }, {
    fixture: 'first-page.move.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('movesList')
})

Cypress.Commands.add('stubAnyMove', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/move\/\w+$/
  }, {
    fixture: 'pound.move.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('anyMove')
})

Cypress.Commands.add('stubAbilitiesList', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/ability\/\?offset=[0-9]+&limit=[0-9]+$/
  }, {
    fixture: 'first-page.ability.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('abilitiesList')
})

Cypress.Commands.add('stubAnyAbility', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/ability\/\w+$/
  }, {
    fixture: 'stench.ability.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('anyAbility')
})

Cypress.Commands.add('stubGenerationsList', () => {
  cy.route2('https://pokeapi.co/api/v2/generation', {
    fixture: 'generations.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('generationsList')
})

Cypress.Commands.add('stubAnyGeneration', () => {
  cy.route2({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/generation\/(\w+-\w+|[0-9]+)$/
  }, {
    fixture: 'generation-1.generation.json',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('anyGeneration')
})

Cypress.Commands.add('testCompleteNavBar', () => {

  cy.get('nav').should('be.visible')

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

  
  cy.get('nav').children('#navbar').children('form').should('be.visible')
  cy.get('nav').children('#navbar').children('form').children('input').should('be.visible')
  cy.get('nav').children('#navbar').children('form').children('button').should('be.visible').and('have.text', 'Search')
})

