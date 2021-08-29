
import { browser, by, element } from 'protractor';

import { AppPage } from './app.po';


describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('e2e are running empty, please implement', () => {
    expect(page);
  });


  it('has correct title', () => {
    browser.get('/');
    const el = element(by.className('navbar-brand'))
    //cy.title().should('equal', 'Weather');
    el.getText().then(x => {
      expect(x).toEqual('Fimatix coding test - The Weather App');
    })
  });
});
