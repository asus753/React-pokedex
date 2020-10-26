/// <reference types="Cypress" />

Cypress.Commands.add('stubPokemonsList', () => {
  cy.server()
  cy.fixture('pokemons-list.json').as('pokemonsListFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\?offset=[0-9]+&limit=[0-9]+$/,
    response: '@pokemonsListFixture',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    }
  }).as('pokemonsList')
})



Cypress.Commands.add('stubAnyPokemon', () => {
  cy.server()
  cy.fixture('bulbasaur.pokemon.json').as('pokemonFixture')
  cy.fixture('bulbasaur.pokemon-species.json').as('pokemonSpecieFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/[a-zA-Z0-9_.-]*$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@pokemonFixture'
  }).as('pokemon')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/\w+$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@pokemonSpecieFixture'
  }).as('pokemonSpecies')
})

Cypress.Commands.add('stubAnyPokemonToFailReq', () => {
  cy.server()
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(-?\d+|\w+)$/,
    force404: true
  }).as('pokemonNotFound')
})



Cypress.Commands.add('stubTypesList', () => {
  cy.server()
  cy.fixture('types-list.json').as('typesListFixture')
  cy.route({
    url: 'https://pokeapi.co/api/v2/type',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response:'@typesListFixture'
  }).as('typesList')

})


Cypress.Commands.add('stubAnyType', () => {

  cy.server()
  cy.fixture('normal.type.json').as('anyTypeFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/type\/\w+$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@anyTypeFixture'
  }).as('type')
})


Cypress.Commands.add('stubMovesList', () => {
  cy.server()
  cy.fixture('movements-list.json').as('moveListFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/move\/\?offset=[0-9]+&limit=[0-9]+$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@moveListFixture'
  }).as('movesList')
})

Cypress.Commands.add('stubAnyMove', () => {
  cy.server()
  cy.fixture('pound.move.json').as('moveFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/move\/\w+$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@moveFixture'
  }).as('move')
})

Cypress.Commands.add('stubAbilitiesList', () => {
  cy.server()
  cy.fixture('abilities-list.json').as('abilitiesListFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/ability\/\?offset=[0-9]+&limit=[0-9]+$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@abilitiesListFixture'
  }).as('abilitiesList')
})


Cypress.Commands.add('stubAnyAbility', () => {
  cy.server()
  cy.fixture('stench.ability.json').as('abilityFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/ability\/\w+$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@abilityFixture'
  }).as('ability')
})


Cypress.Commands.add('stubGenerationsList', () => {
  cy.server()
  cy.fixture('generations-list.json').as('generationListFixture')
  cy.route({
    url: 'https://pokeapi.co/api/v2/generation',
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@generationListFixture'
  }).as('generationsList')
})

Cypress.Commands.add('stubAnyGeneration', () => {
  cy.server()
  cy.fixture('generation-1.generation.json').as('generationFixture')
  cy.route({
    url: /^https:\/\/pokeapi\.co\/api\/v2\/generation\/(\w+-\w+|[0-9]+)$/,
    headers: {
      'access-control-allow-origin': Cypress.config('baseUrl'),
    },
    response: '@generationFixture'
  }).as('anyGeneration')
})
