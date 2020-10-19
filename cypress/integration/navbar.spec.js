/// <reference types="Cypress" />

describe('Navbar', () => {
  describe('the navbar works in the homepage', () => {
    before(() => {
      cy.visit(Cypress.config('baseUrl'))
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })

  describe('the navbar works in the pokemons list page', () => {
    before(() => {
      cy.stubPokemonsList()
      cy.visit(Cypress.config('baseUrl') + '/pokemon')
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })

  /* describe('the navbar works in the one pokemon page', () => {
    const POKEMON_ID = 1
    
    before(() => {
      cy.stubAnyPokemon()
      cy.visit(Cypress.config('baseUrl') + `/pokemon/${POKEMON_ID}`)
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })

  describe('the navbar works in the types list page', () => {
    before(() => {
      cy.stubTypes()
      cy.visit(Cypress.config('baseUrl') + '/type')
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  }) */

  describe('the navbar works in one type page', () => {
    const TYPE_NAME = 'normal'

    before(() => {
      cy.stubAnyType()
      cy.visit(Cypress.config('baseUrl') + `/type/${TYPE_NAME}`)
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })

  describe('the navbar works in movements list page', () => {
    before(() => {
      cy.stubMovesList()
      cy.visit(Cypress.config('baseUrl') + '/move')
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })
  
  describe('the navbar works in one move page', () => {
    const MOVE_NAME = 'pound'

    before(() => {
      cy.stubAnyMove()
      cy.visit(Cypress.config('baseUrl') + `/move/${MOVE_NAME}`)
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  });

  describe('the navbar works in abilities list page', () => {
    before(() => {
      cy.stubAbilitiesList()
      cy.visit(Cypress.config('baseUrl') + '/ability')
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })

  describe('the navbar works in one ability page', () => {
    const ABILITY_NAME = 'stench'

    before(() => {
      cy.stubAnyAbility()
      cy.visit(Cypress.config('baseUrl') + `/ability/${ABILITY_NAME}`)
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  });

  describe('the navbar works in generations list page', () => {
    before(() => {
      cy.stubGenerationsList()
      cy.visit(Cypress.config('baseUrl') + '/generation')
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  })

  describe('the navbar works in one ability page', () => {
    const GENERATION_NAME = 'generation-i'

    before(() => {
      cy.stubAnyGeneration()
      cy.visit(Cypress.config('baseUrl') + `/generation/${GENERATION_NAME}`)
    })

    it('test complete navabar', () => {
      cy.testCompleteNavBar()
    })
  });



});
