describe('Crud Marca Spec', () => {

  const urlBase = 'https://moverfrotas.netlify.app/'
  const urlListagem = urlBase + 'brands'
  const urlNovo = urlBase +  '/brands/new'

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

    cy.get('td').should('contain', 'BYD')
  })

  it('valida editar', () => {
    buscar()
    
    cy.get('td button').last().click()
    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Registro atualizado com sucesso.')
  })

  it('valida deletar', () => {
    cy.clock()
    buscar()
    
    cy.get('td button').first().click()
    cy.get('button').contains('Sim').click()
    cy.get('div').should('contain', 'Registro deletado com sucesso.')
  })

  function buscar(){
    cy.visit(urlListagem)
    cy.get('#pesquisar').type('BYD')
    cy.get('button').contains('Pesquisar').click()
    cy.wait(2000)
  }

  function preencherFormulario(){
    cy.wait(1000)
    cy.get('#name').type('BYD')

    cy.get('.icon-title').click()
    cy.get('span').contains('BMW').click()
  }

  function validaCampoVazioFormulario(){
    cy.get('#name').should('have.value', '')

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})