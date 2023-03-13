import React from 'react'
import AddRecord from './AddRecord'

describe('<AddRecord />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddRecord />)
  })
})