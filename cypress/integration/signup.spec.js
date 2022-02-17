it('successfully signs up using confirmation code sent via email', () => {
  const faker = require('faker')
  const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  const password = Cypress.env('USER_PASSWORD')

  cy.intercept('GET', '**/notes').as('getNotes') //interceptar a requisição inicialmente
  cy.fillSignupFormAndSubmit(emailAddress, password)

  //comando proprio do mailosaur
  //dentro do server pega o email address e, depois de pegar realiza o que esta no then
  //match esta pegando os primeiros 6 digitos do local indicado
  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: emailAddress
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait('@getNotes') //a requisição do intercept acontece
    cy.contains('h1', 'Your Notes').should('be.visible') //verifica se existe um h1 com o texto your notes
  })
})