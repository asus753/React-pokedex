describe('pokemons list page', () => {
  before(() => {
    cy.stubPokemonsList()
    cy.visit(Cypress.config('baseUrl') + '/pokemon')
  })

  context('pagination bar', () => {

    beforeEach(() => {
      cy.stubPokemonsList()
    })

    it('the pagination component is rendered correctly', () => {
      cy.get('#pagination').should('be.visible')
      cy.get('#pagination').children('.pagination').children('li').should('have.length.at.least', 9)
    })

    it('the first page is marked as active by default', () => {
      cy.get('.page-item').contains('1').parent('li').should('have.class', 'active')
    })

    it('if I move to the second page, now this is marked and the first no more', () => {
      cy.stubPokemonsList()
      cy.get('.page-item').contains('2').click()

      cy.get('.page-item').contains('1').parent('li').should('not.have.class', 'active')
      cy.get('.page-item').contains('2').parent('li').should('have.class', 'active')
    })

    after(() => {
      cy.get('.page-item').contains('1').click()
    })
  })

  describe('renders the list of pokemons', () => {

    before(() => {
      cy.get('.page-item').contains('1').click()
    })

    beforeEach(() => {
      cy.stubPokemonsList()
    })

    it('first page', () => {
      cy.get('#pokemons-list').should('be.visible')
      cy.get('#pokemons-list').children('a').each($el => {
        cy.get($el)
          .should('be.visible')
          .and('have.attr', 'href').and('eq', '/pokemon/' + $el.text())
        
        cy.get($el).children('button').should('exist')
      })
    })

    it('second page', () => {
      cy.get('.page-item').contains('2').click()

      cy.get('#pokemons-list').should('be.visible')
      cy.get('#pokemons-list').children('a').each($el => {
        cy.get($el)
          .should('be.visible')
          .and('have.attr', 'href').and('eq', '/pokemon/' + $el.text())
        
        cy.get($el).children('button').should('exist')
      })
    })
  })


})