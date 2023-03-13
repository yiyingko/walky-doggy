import React from 'react'
import walker from './index'

describe('<walker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<walker />)
  })
})