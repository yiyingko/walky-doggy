import React from 'react'
import AddEvent from './AddEvent'

describe('<AddEvent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddEvent />)
  })
})