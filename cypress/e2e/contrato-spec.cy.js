describe('Crud Contrato Spec', () => {

  const urlBase = Cypress.env('urlBase')
  const urlListagem = urlBase + 'contracts'
  const urlNovo = urlBase +  '/contracts/new'

  beforeEach(() => {
    cy.login()
  })

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

    cy.get('td').should('contain', 'CLIENTE DE TESTE')
  })

  it('valida editar', () => {
    buscar()
    
    cy.get('td button').eq(1).click()
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
    cy.get('#search').type('Cliente de Teste')
    cy.get('button').contains('Pesquisar').click()
    cy.wait(2000)
  }

  function preencherFormulario(){
    cy.get('#client')
      .first()
      .click()
      .find('p-dropdownitem')
      .eq(1)
      .click()

    cy.get('#vehicle')
      .first()
      .click()
      .find('p-dropdownitem')
      .eq(1)
      .click()

    cy.get('#initialDate').clear().type('30112024')
    cy.get('#billingStartDate').type('30112024', { force: true })
    cy.get('#depositAmount').type('150000', { force: true })
    cy.get('#recurrenceValue').type('65000')

    cy.get('#paymentFrequency')
      .first()
      .click()
      .find('p-dropdownitem')
      .contains('SEMANAL')
      .click()

    cy.get('#paymentDay')
      .first()
      .click()
      .find('p-dropdownitem')
      .contains('SEXTA-FEIRA')
      .click()
  }

  function validaCampoVazioFormulario(){
    cy.get('#client').first().should('contain' , 'Selecione')
    cy.get('#vehicle').first().should('contain' , 'Selecione') 
    cy.get('#initialDate').should('not.have.value', '')
    cy.get('#endDate').should('have.value', '')
    cy.get('#billingStartDate').should('have.value', '')
    cy.get('#depositAmount').should('have.value', '0,00')
    cy.get('#recurrenceValue').should('have.value', '0,00')

    cy.get('#paymentFrequency').first().should('contain' , 'Selecione')
    cy.get('#paymentDay').first().should('contain' , 'Selecione')
    cy.get('#situation').first().should('contain' , 'EM ANDAMENTO')
  

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})