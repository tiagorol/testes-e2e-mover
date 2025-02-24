describe('Crud Lancamento Spec', () => {

  const urlBase = Cypress.env('urlBase')
  const urlListagem = urlBase + 'transactions'
  const urlNovo = urlBase +  '/transactions/new'

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
    preencherFormularioReceita() 
    cy.get('button').contains('Cancelar').click()

    validaCampoVazioFormulario()
  })

  it('valida salvar receita', () => {
    cy.visit(urlNovo)
    preencherFormularioReceita()

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Registro cadastrado com sucesso.')
  })

  it('valida salvar receita parcelamento fixo', () => {
    cy.visit(urlNovo)
    preencherFormularioReceita()
    preencherFormularioParcelamentoFixo()

    cy.get('button').contains('Salvar').click()
    cy.wait(2000)
    cy.get('div').should('contain', 'Registro cadastrado com sucesso.')
  })

  it('valida buscar', () => {
    buscar()

    cy.get('td').should('contain', 'LANÇAMENTO DE TESTE')
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
    cy.get('div').should('contain', 'Lançamento excluido com sucesso.')
  })

  it('valida deletar parcelamento fixo', () => {
    buscaPrarcelamentoFixo()
    
    cy.get('td button').first().click()
    cy.get('button').contains('Excluir este e os próximos').click()
    cy.wait(2000)
    cy.get('div').should('contain', 'Lançamentos excluídos com sucesso.')
  })

  function buscaPrarcelamentoFixo(){
    cy.visit(urlListagem)
    cy.get('input[name="period"]').clear({ force: true }).type('12/2024', { force: true })
    cy.get('#search').type('Lançamento Fixo')  
    
    cy.get('button').contains('Pesquisar').click({force: true} )
    cy.wait(2000)
  }

  function buscar(){
    cy.visit(urlListagem)
    cy.get('input[name="period"]').clear({ force: true }).type('11/2024', { force: true })
    cy.get('#search').type('Lançamento de Teste')  
    
    cy.get('button').contains('Pesquisar').click({force: true} )
    cy.wait(2000)
  }

  function preencherFormularioParcelamentoFixo(){
    cy.get('button').contains('Ativa repetição').click()

    cy.get('#type')
      .first()
      .click()
      .find('p-dropdownitem')
      .contains('FIXO')
      .click()

      cy.get('#frequency')
        .first()
        .click()
        .find('p-dropdownitem')
        .contains('SEMANAL')
        .click()

      cy.get('#description').clear().type('Lançamento Fixo de Teste')
      cy.get('#value').clear().type('63000')

      cy.get('input[name="dueDate"]').clear({ force: true }).type('10/11/2024', { force: true })
      cy.get('input[name="paymentDate"]').clear({ force: true })
      cy.get('input[name="paid"]').uncheck({ force: true }).uncheck({ force: true })
  }

  function preencherFormularioReceita(){
    cy.get('#typeCategory')
      .first()
      .click()
      .find('p-dropdownitem')
      .contains('RECEITA')
      .click()

    cy.get('#subcategory')
      .first()
      .click()
      .find('p-dropdownitem')
      .eq(0)
      .click()

    cy.wait(500)

    cy.get('#description').type('Lançamento de Teste')

    cy.get('#vehicle')
      .first()
      .click()
      .find('p-dropdownitem')
      .eq(1)
      .click()

    cy.get('#account')
      .first()
      .click()
      .find('p-dropdownitem')
      .eq(1)
      .click()

    cy.get('#card')
      .first()
      .click()
      .find('p-dropdownitem')
      .eq(1)
      .click()

    cy.get('#value').type('150000')

    cy.get('input[name="dueDate"]').type('10/11/2024', { force: true })
    cy.get('input[name="paymentDate"]').type('10/11/2024', { force: true })
  }

  function validaCampoVazioFormulario(){
    cy.get('#typeCategory').first().should('contain' , 'Selecione')
    cy.get('#subcategory').first().should('contain' , 'Selecione')
    cy.get('#description').should('have.value', '');
    cy.get('#vehicle').first().should('contain' , 'Selecione')
    cy.get('#contract').first().should('contain' , 'Selecione')
    cy.get('#account').first().should('contain' , 'Selecione')
    cy.get('#card').first().should('contain' , 'Selecione')
    cy.get('#value').should('have.value', '0,00');
    cy.get('#dueDate').should('have.value', '');
    cy.get('#paymentDate').should('have.value', '');

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})