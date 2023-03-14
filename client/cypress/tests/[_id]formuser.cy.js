import React from 'react'
import formuser from './[_id]'

describe('<formuser />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<formuser />)
  })
})