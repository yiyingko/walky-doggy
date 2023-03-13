import React from 'react';
import Layout from './Layout';
import Footer from './Footer';
import Navbar from './Navbar';

describe('<Layout />', () => {
  it('renders', () => {
    cy.mount(<Layout />);
    cy.get('div').should('have.class', 'content');
    cy.mount(<Navbar />);
    cy.mount(<Footer />);
  });
});
