describe('Crud Cartao Spec', () => {

  const urlBase = 'https://moverfrotas.netlify.app/'
  const urlListagem = urlBase + 'cards'
  const urlNovo = urlBase +  '/cards/new'

  it('valida botao novo', () => {
    cy.visit(urlListagem)
    cy.get('button').contains('Novo').click()

    validaCampoVazioFormulario()
  })

  it('valida botao voltar', () => {
    cy.visit(urlNovo)
    cy.get('a').contains('Voltar').click()

    cy.url().should('eq', urlListagem)
  })

  it('valida botao cancelar', () => {
    cy.visit(urlListagem)
    cy.get('button').contains('Novo').click()
    preencherFormulario()
    cy.get('button').contains('Cancelar').click()

    validaCampoVazioFormulario()
  })

  it('valida salvar', () => {
    cy.visit(urlNovo)
    preencherFormulario()

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Registro cadastrado com sucesso.')
  })

  it('valida buscar', () => {
    buscar()

    cy.get('td').should('contain', 'BRADESCO')
  })

  it('valida editar', () => {
    buscar()
    
    cy.get('td button').last().click()
    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Registro atualizado com sucesso.')
  })

  it('valida deletar', () => {
    buscar()
    
    cy.get('td button').first().click()
    cy.get('button').contains('Sim').click()
    cy.get('div').should('contain', 'Registro deletado com sucesso.')
  })

  function buscar(){
    cy.visit(urlListagem)
    cy.get('#search').type('Cartão Bradesco')
    cy.get('button').contains('Pesquisar').click()
    cy.wait(2000)
  }

  function preencherFormulario(){
    cy.get('#bankName').type('Cartão Bradesco')
    cy.get('#limit').type('10000.00')
    cy.get('#closingDay').type('30')
    cy.get('#dueDate').type('5')
    
    cy.get('#account')
      .first()
      .click()
      .find('p-dropdownitem')
      .last()
      .click()

      cy.get('.icon-title').click()
      cy.get('span').contains('AGI Bank').click()
  }

  function validaCampoVazioFormulario(){
    cy.get('#bankName').should('have.value', '')
    cy.get('#limit').should('have.value', '0,00')
    cy.get('#closingDay').should('have.value', '')
    cy.get('#dueDate').should('have.value', '')
    cy.get('#account').first().should('contain' , 'Selecione')

    cy.get('input[name="active"]').should('be.checked')
  
    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})