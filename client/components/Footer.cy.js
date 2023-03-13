import React from 'react';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renders', () => {
    cy.mount(<Footer />);
    cy.get('footer').should(
      'have.text',
      'Copyright © 2023 Walky Doggy. All rights reserved.'
    );
  });
});
