import React from 'react'
import { EventContextProvider } from './EventContextProvider'

describe('<EventContextProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EventContextProvider />)
  })
})