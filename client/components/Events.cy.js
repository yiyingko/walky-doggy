import React from 'react';
import Events from './Events';

describe('<Events />', () => {
  it('renders', () => {
    cy.mount(<Events />);
    cy.get('div').should('have.id', '__next_css__DO_NOT_USE__');
  });
});
