import React from 'react'
import AddEvent from './AddEvent'

describe('<AddEvent />', () => {
  beforeEach(() => {
    cy.mount(<AddEvent />)
  })
  it('Should have all the labels', () => {
    cy.get('h1').should('have.text', 'Book a Walk');
    cy.get('.add-form > :nth-child(2) > label').should('have.text', 'DOG NAME');
    cy.get('.add-form > :nth-child(3) > label').should('have.text', 'DATE');
    cy.get('.add-form > :nth-child(4) > label').should('have.text', 'PICK-UP LOCATION');
  })
  it('Should complete the form and submit', () => {
    cy.get(':nth-child(2) > input').type('Rex')
    cy.get('.date-picker').click();
    cy.contains('30').click();
    cy.contains('3:00 PM').click();
    cy.get(':nth-child(4) > input').type("Carrer d'avila, 27");
    cy.get('form').click()
  })
})