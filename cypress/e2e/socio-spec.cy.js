describe('Crud Socio Spec', () => {

  const urlBase = Cypress.env('urlBase')
  const urlListagem = urlBase + 'partners'
  const urlNovo = urlBase +  '/partners/new'

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

  it('valida email', () => {
    cy.visit(urlNovo)
    cy.get('#name').type('Fulano de Tal')
    cy.get('#email').type('fulanodetal')

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'E-mail inválido.')
  })

  it('valida salvar', () => {
    cy.visit(urlNovo)
    preencherFormulario()

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Registro cadastrado com sucesso.')
  })

  it('valida buscar', () => {
    buscar()

    cy.get('td').should('contain', 'FULANO DE TAL')
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
    cy.get('#search').type('Fulano de')
    cy.get('button').contains('Pesquisar').click()
    cy.wait(2000)
  }

  function preencherFormulario(){
    cy.get('#name').type('Fulano de Tal')
    cy.get('#email').type('fulanodetal@gmail.com')
  }

  function validaCampoVazioFormulario(){
    cy.get('#name').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('input[name="active"]').should('be.checked')

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})