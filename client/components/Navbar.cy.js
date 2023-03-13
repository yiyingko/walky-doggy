import React from 'react';
import Navbar from './Navbar';

describe('<Navbar />', () => {
  it('Have an image', () => {
    cy.mount(<Navbar />);
    cy.get('img').should('have.attr', 'alt').and('equal', 'man-with-dog');
  });
  it('Have 3 links', () => {
    cy.mount(<Navbar />);
    cy.get('a').should(($a) => {
      expect($a).to.have.length(3);

      const links = $a.map((i, el) => {
        return Cypress.$(el).attr('href');
      });

      expect(links.get()).to.deep.eq(['/', '/myaccount', '/walker']);
    });
  });
});
