/// <reference types="Cypress" />

import pokemon from '../fixtures/bulbasaur.pokemon.json'
import pokemonSpecie from '../fixtures/bulbasaur.pokemon-species.json'

describe('Pokemon page', () => {
  const POKEMON_ID = pokemon.id
  const POKEMON_NAME = pokemon.name
  const POKEMON_IMAGE = pokemon.sprites.front_default
  const DESCRIPTION_OF_THE_SPECIE = pokemonSpecie.flavor_text_entries[91].flavor_text

  before(() => {
    cy.stubAnyPokemon()
    cy.visit(Cypress.config('baseUrl') + '/pokemon/' + POKEMON_ID)
  })

  it('renders the name and id of the pokemon as tittle', () => {
    cy.get('h1')
      .should('contain.text', POKEMON_NAME)
      .and('contain.text', POKEMON_ID)
  })

  it('renders the image of the pokemon', () => {
    cy.get(`img[alt=${POKEMON_NAME}]`)
      .should('be.visible')
      .and('have.attr', 'src', POKEMON_IMAGE)
  })

  it('renders the description of pokemon with the height and weight', () => {
    cy.get('#description').should('be.visible')

    cy.get('#description').children('.card-body').children('.card-title')
      .should('have.text', 'Description')

    cy.get('#description').children('.card-body').children('.card-text').children('p')
      .should('have.length', 2)

    cy.get('#description').children('.card-body').children('.card-text').children('p')
      .then($paragraphs => {
        cy.wrap($paragraphs).its(1)
          .should('contain.text', pokemon.height)
          .and('contain.text', pokemon.weight)

        cy.wrap($paragraphs).its(0)
          .should('contain.text', DESCRIPTION_OF_THE_SPECIE)
      })
  })

  context('renders the accordion with the characteristics of the pokemon', () => {
    it('renders the accordion container', () => {
      cy.get('.accordion').should('be.visible')
      cy.get('.accordion').children('div > .card')
        .should('have.length', 4)
    })

    it('at first, they diffrents sections are not shown', () => {
      cy.get('.accordion').children('div > .card').each($accordionSection => {
        expect($accordionSection.children('.collapse').children('.card-body')).not.be.visible
      })
    })

    it('unfolds the accordion when is clicked, if is clicked one more time contracts', () => {
      cy.get('.accordion').children('div > .card').each($accordionSection => {
        
        cy.get($accordionSection.children('.card-header')).click().then(() => {
          cy.get($accordionSection.children('.collapsing').children('.card-body')).should('be.visible')
        })

        cy.get($accordionSection.children('.card-header')).click().then(() => {
          cy.get($accordionSection.children('.collapsing').children('.card-body')).should('not.be.visible')
        })
      })
    })

    context('shows the list of movements', () => {
      before(() => {
        cy.get('.accordion').children('#moves').children('.card-header').click()
      })
      
      it('all movements are shown', () => {
        pokemon.moves.forEach(move => {
          cy.get('#moves').children('.show')
            .should('contain.text', move.move.name)
        })
      })

      it('all movements have a href that redirects to the movement page', () => {
        cy.get('#moves').children('.show').children('.card-body').children('ul').children('li').each($move => {
          cy.get($move.children('a')).should('have.attr', 'href', '/move/' + $move.text())
          cy.get($move).should('be.visible')
        })
      })
    })

    context('shows the list of types', () => {
      before(() => {
        cy.get('.accordion').children('#types').children('.card-header').click()
      })

      it('all types are shown', () => {
        pokemon.types.forEach(type => {
          cy.get('#types').children('.show')
            .should('contain.text', type.type.name)
        })
      })

      it('all types have a href that redirects to the type page', () => {
        cy.get('.accordion').children('#types').children('.show').children('.card-body').children('strong').each($type => {
          cy.get($type).children('a').should('have.attr', 'href', '/type/' + $type.text())
        })
      })

    })

    context('shows the list of abilities', () => {
      before(() => {
        cy.get('.accordion').children('#abilities').children('.card-header').click()
      })

      it('all abilities are shown', () => {
        pokemon.abilities.forEach(ability => {
          cy.get('#abilities').children('.show')
            .should('contain.text', ability.ability.name)
        })
      })

      it('all abilities have a href that redirects to the ability page', () => {
        cy.get('.accordion').children('#abilities').children('.show').children('.card-body').children('strong').each($ability => {
          cy.get($ability).children('a').should('have.attr', 'href', '/ability/' + $ability.text())
        })
      })

    })

    context('shows the table of pokemon stats', () => {
      before(() => {
        cy.get('.accordion').children('#stats').children('.card-header').click()
      })

      it('the table contains all necessary columns', () => {

        pokemon.stats.forEach(stat => {
          cy.get('.accordion').children('#stats').children('.show')
            .children('.card-body').children('.table-responsive').children('table')
            .children('thead').children('tr').children('th')
              .should('contain.text', stat.stat.name)
        })
      })

      it('the table contains all stats values', () => {
        pokemon.stats.forEach(stat => {
          cy.get('.accordion').children('#stats').children('.show')
            .children('.card-body').children('.table-responsive').children('table')
            .children('tbody').children('tr').children('td')
              .should('contain.text', stat.base_stat)
        })
      })
    })
  })
})