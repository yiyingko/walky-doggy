import React from 'react';
import Layout from './Layout';
import Footer from './Footer';
import Navbar from './Navbar';

describe('<Layout />', () => {
  it('Should have div with class content', () => {
    cy.mount(<Layout />);
    cy.get('div').should('have.class', 'content');
    cy.mount(<Navbar />);
    cy.mount(<Footer />);
  });
  it('Should have Navbar and Footer', () => {
    cy.mount(<Layout />);
    cy.mount(<Navbar />);
    cy.mount(<Footer />);
  });
});
