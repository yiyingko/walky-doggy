import React from 'react'
import bookawalk from './bookawalk'

describe('<bookawalk />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<bookawalk />)
  })
})