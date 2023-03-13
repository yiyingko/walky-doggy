import React from 'react'
import Events from './Events'

describe('<Events />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Events />)
  })
})