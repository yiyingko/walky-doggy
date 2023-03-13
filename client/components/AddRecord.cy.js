import React from 'react'
import AddRecord from './AddRecord'

describe('<AddRecord />', () => {
  beforeEach(() => {
    cy.mount(<AddRecord />)
  })
  it('Should have title', () => {
    cy.get('h1').should('have.text', 'POO/PEE RECORD');
  })
  it('Should have the label on the checkbox', () => {
    cy.get('.adjustfont').should('have.text', 'PEE');
    cy.get(':nth-child(2) > .submit-form-control > label').should('have.text', 'POO');
  })
  it('Should check the checkboxs', () => {
    cy.get(':nth-child(1) > :nth-child(1) > input').check();
    cy.get(':nth-child(2) > .submit-form-control > input').check();
  })
  it('Should submit the form', () => {
    cy.get('form').click()
  })
})