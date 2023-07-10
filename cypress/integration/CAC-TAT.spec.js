/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
            cy.visit('./src/index.html') // Teste fecha a tela do cypress
            // cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') // Teste passou
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  })
  