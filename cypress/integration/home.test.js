/// <reference types="cypress" />
describe('City Weather Test Suit', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('has correct title', () => {
    cy.title().should('equal', 'Weather');
  });

  it('city search box should be empty', () => {
    expect(cy.get('[data-cy=city]')).to.exist;
    cy.get('[data-cy=city]').should('contain.text', '');
  });

  it('search botton exists', () => {
    expect(cy.get(cy.get('[data-cy=search]'))).to.exist;
    cy.get('[data-cy=search]').should('contain.text', 'Search');
  });

  it('search for city', () => {
    cy.get('[data-cy=city]').type('London');
    cy.get('[data-cy=search]').click();

    cy.get('[data-cy=London]').should('be.visible');
  });

  it('search for mutiple cities', () => {
    
    cy.get('[data-cy=city]').type('London');
    cy.get('[data-cy=search]').click();

    cy.get('[data-cy=city]').clear();

    cy.get('[data-cy=city]').type('Paris');
    cy.get('[data-cy=search]').click();

    cy.get('[data-cy=London]').should('be.visible');
    cy.get('[data-cy=Paris]').should('be.visible');
  });
})
