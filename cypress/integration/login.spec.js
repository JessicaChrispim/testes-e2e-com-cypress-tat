it('successfully logs in', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    
    cy.fillLoginFormAndSubmit(
      Cypress.env('USER_EMAIL'),
      Cypress.env('USER_PASSWORD'),
      { cacheSession: false }
    )
  
    cy.wait('@getNotes')
    }
  )
  