import React from 'react'
import viewwalks from './viewwalks'

describe('<viewwalks />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<viewwalks />)
  })
})