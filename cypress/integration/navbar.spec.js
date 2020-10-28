/// <reference types="Cypress" />

function testCompleteNavBar () {
  cy.get('nav').should('be.visible')

  cy.get('nav').children('.navbar-brand')
    .should('have.text', 'Pokedex')
    .and('be.visible')
    .and('have.attr', 'href', '/')

  cy.get('nav').children('#navbar').contains('pokemons')
    .should('be.visible')
    .and('have.attr', 'href', '/pokemon')

  cy.get('nav').children('#navbar').contains('generations')
    .should('be.visible')
    .and('have.attr', 'href', '/generation')

  
  cy.get('nav').children('#navbar').children('form').should('be.visible')
  cy.get('nav').children('#navbar').children('form').children('input').should('be.visible')
  cy.get('nav').children('#navbar').children('form').children('button').should('be.visible').and('have.text', 'Search')
}

describe('the navbar is visible and works in all routes of the app', () => {

  context('the navbar links redirects correctly', () => {
    before(() => {
      cy.visit(Cypress.config('baseUrl'))
    })

    it('the pokedex link redirects to the homepage', () => {
      cy.get('nav').children('.navbar-brand').click()

      cy.url().should('eq', Cypress.config('baseUrl') + '/')
    })

    it('the link pokemons redirects to the pokemons list page', () => {
      cy.stubPokemonsList()
      cy.get('nav').children('#navbar').contains('pokemons').click()

      cy.url().should('eq', Cypress.config('baseUrl') + '/pokemon')
    })

    it('the generation links redirects to the generation list page', () => {
      cy.stubGenerationsList()
      cy.get('nav').children('#navbar').contains('generations').click()

      cy.url().should('eq', Cypress.config('baseUrl') + '/generation')
    })
  })

  context('the navbar works in the homepage', () => {
    before(() => {
      cy.visit(Cypress.config('baseUrl'))
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in the pokemons list page', () => {
    before(() => {
      cy.stubPokemonsList()
      cy.visit(Cypress.config('baseUrl') + '/pokemon')
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in the one pokemon page', () => {
    const POKEMON_ID = 1
    before(() => {
      cy.stubAnyPokemon()
      cy.visit(Cypress.config('baseUrl') + `/pokemon/${POKEMON_ID}`)
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in the types list page', () => {
    before(() => {
      cy.stubTypesList()
      cy.visit(Cypress.config('baseUrl') + '/type')
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in one type page', () => {
    const TYPE_NAME = 'normal'
    before(() => {
      cy.stubAnyType()
      cy.visit(Cypress.config('baseUrl') + `/type/${TYPE_NAME}`)
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in movements list page', () => {
    before(() => {
      cy.stubMovesList()
      cy.visit(Cypress.config('baseUrl') + '/move')
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in one move page', () => {
    before(() => {
      const MOVE_NAME = 'pound'
      cy.stubAnyMove()
      cy.visit(Cypress.config('baseUrl') + `/move/${MOVE_NAME}`)
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in abilities list page', () => {
    before(() => {
      cy.stubAbilitiesList()
      cy.visit(Cypress.config('baseUrl') + '/ability')
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in one ability page', () => {
    before(() => {
      const ABILITY_NAME = 'stench'
      cy.stubAnyAbility()
      cy.visit(Cypress.config('baseUrl') + `/ability/${ABILITY_NAME}`)
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in generations list page', () => {
    before(() => {
      cy.stubGenerationsList()
      cy.visit(Cypress.config('baseUrl') + '/generation')
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
  context('the navbar works in one ability page', () => {
    before(() => {
      const GENERATION_NAME = 'generation-i'
      cy.stubAnyGeneration()
      cy.visit(Cypress.config('baseUrl') + `/generation/${GENERATION_NAME}`)
    })
  
    it('test complete navabar', () => {
      testCompleteNavBar()
    })
  })
  
})

describe('the searchBar works correctly', () => {

  context('works when correct id is entered', () => {
    
    const POKEMON_ID = 5

    before(() => {
      cy.visit(Cypress.config('baseUrl'))
      cy.stubAnyPokemon()

      cy.get('#navbar').children('form').children('input').type(POKEMON_ID.toString())
      cy.get('#navbar').children('form').children('button[type=submit]').click()
    })

    it('redirects to the pokemon page', () => {
      cy.url().should('eq', `${Cypress.config('baseUrl')}/pokemon/${POKEMON_ID}`)
    })
  })

  context('works when a incorrect id is entered', () => {
    const POKEMON_INVALID_ID = -5

    before(() => {
      cy.visit(Cypress.config('baseUrl'))
      cy.stubAnyPokemonToFailReq()

      cy.get('#navbar').children('form').children('input').type(POKEMON_INVALID_ID.toString())
      cy.get('#navbar').children('form').children('button[type=submit]').click()
    })

    it('remains on the home page', () => {
      cy.url().should('eq', Cypress.config('baseUrl') + '/')
    })

    it('the input is marked with a red border', () => {
      cy.get('#navbar').children('form').children('input').should('have.class', 'is-invalid')
    })
  })
})