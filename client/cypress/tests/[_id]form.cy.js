import React from 'react'
import form from '../../src/pages/form/[_id]'

describe('<form />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<form />)
  })
})