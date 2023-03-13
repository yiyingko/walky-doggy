import React from 'react'
import Event from './Event'

const date = '04:30 PM - March 16th, 2023'

describe('<Event />', () => {
  beforeEach(() => {
    cy.mount(<Event event ={date}/>)
  })
  it('Should render the event with date', () => {
    cy.mount(<Event event ={date}/>)
  })
  it('Should have a click button', () => {
    cy.get('.btn').click()
  })
})