/// <reference types="cypress" />
describe('London data update test', () => {
    const londonUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=london&cnt=4&units=metric&APPID=010721642521f31b0fbc8c3831d45951'; 
    const parisUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=paris&cnt=4&units=metric&APPID=010721642521f31b0fbc8c3831d45951';
    beforeEach(() => {
        cy.visit('/');
    })
    it('search for london again but has different date', () => {
      
      cy.intercept(londonUrl, {fixture: "london-mock-data-1.json"});
      cy.get('[data-cy=city]').type('London');
      cy.get('[data-cy=search]').click();

      cy.wait(1000);
      cy.get('[data-cy=city]').clear();

      cy.intercept(parisUrl, {fixture: "paris-mock-data.json"});
      cy.get('[data-cy=city]').type('Paris');
      cy.get('[data-cy=search]').click();

      
      cy.wait(3000);
      cy.get('[data-cy=city]').clear();
     
      cy.intercept(londonUrl, {fixture: "london-mock-data-2.json"});
      cy.get('[data-cy=city]').type('London');
      cy.get('[data-cy=search]').click();
  
      cy.get('[data-cy=London]').should('be.visible');
      
    });
  })
  