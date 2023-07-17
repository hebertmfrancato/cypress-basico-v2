/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
        beforeEach(function(){
            // cy.visit('./src/index.html') // Teste fecha a tela do cypress
            cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') // Teste passou
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Lorem ipsum dolor sit amet. Sit consequuntur saepe aut eius voluptatum est repellat unde sit facere tempora ex assumenda dolore aut numquam fugiat vel dolore animi. 33 eveniet voluptatem aut quam magnam eum autem molestiae At assumenda corrupti! Est esse autem ut perspiciatis culpa aut distinctio voluptate ab repudiandae ducimus ut autem consequuntur ad omnis sunt et nostrum odio. Cum quas dolorum et omnis rerum non sapiente alias sed provident adipisci ea ipsa magnam. Eum voluptas molestiae id maiores asperiores qui rerum obcaecati At voluptas sunt hic fuga laboriosam ad tenetur delectus. Id repellendus culpa eum dignissimos ipsa sed accusamus voluptas ex dolores quaerat aut molestias officiis aut voluptates rerum? Quo sunt tempora non magni quasi quo voluptatem pariatur nam quod optio id doloremque officia vel aliquam dolores est praesentium mollitia? Ut consequatur voluptatum ea doloribus dicta et laboriosam nobis et soluta aspernatur. Sed similique asperiores et autem necessitatibus quo earum neque? Vel dolores consequatur sed voluptate delectus id fugiat eveniet et neque tempore. Quo voluptas animi a eius quod et galisum galisum aut minus enim est obcaecati enim ea dolore dolor eum dolores exercitationem.'
        cy.get('#firstName').type('Hebert')
        cy.get('#lastName').type('Francato')
        cy.get('#email').type('hebert@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Hebert')
        cy.get('#lastName').type('Francato')
        cy.get('#email').type('hebert@exemplo,com')
        cy.get('#open-text-area').type('Como posso realizar o cancelamento?')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Hebert')
        cy.get('#lastName').type('Francato')
        cy.get('#email').type('hebert@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Como posso realizar o cancelamento?')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Hebert')
          .should('be.value', 'Hebert')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Francato')
          .should('be.value', 'Francato')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('hebert@exemplo.com')
          .should('be.visible', 'hebert@exemplo.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('be.visible', '1234567890')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca cada tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
    })    
  })
  