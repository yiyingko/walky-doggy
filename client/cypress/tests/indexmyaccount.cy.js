import React from 'react'
import myaccount from './index'

describe('<myaccount />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<myaccount />)
  })
})