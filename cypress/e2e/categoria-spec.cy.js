describe('Crud Categoria Spec', () => {

  const urlBase = Cypress.env('urlBase')
  const urlListagem = urlBase + 'categories'
  const urlNovo = urlBase +  '/categories/new'

  beforeEach(() => {
    cy.login()
  })

  it('valida botao novo', () => {
    cy.visit(urlListagem)
    cy.get('button').contains('Novo').click({force: true})

    validaCampoVazioFormulario()
  })

  it('valida botao voltar', () => {
    cy.visit(urlNovo)
    cy.get('a').contains('Voltar').click()

    cy.url().should('eq', urlListagem)
  })

  it('valida botao cancelar', () => {
    cy.visit(urlListagem)
    cy.get('button').contains('Novo').click({force: true})
    preencherFormulario()
    cy.get('button').contains('Cancelar').click({force: true})

    validaCampoVazioFormulario()
  })

  it('valida salvar', () => {
    cy.visit(urlNovo)
    preencherFormulario()

    cy.get('button').contains('Salvar').click({force: true})
    cy.get('div').should('contain', 'Registro cadastrado com sucesso.')
  })

  it('valida buscar', () => {
    buscar()

    cy.get('td').should('contain', 'CATEGORIA DE TESTES')
  })

  it('valida editar', () => {
    buscar()
    
    cy.get('td button').last().click()

    cy.get('td button').last().click()

    cy.get('.p-dialog-content').find('input').first().clear().type('Nova Subcategoria de Testes')
    cy.get('.p-dialog-content').find('button').contains('Salvar').click()
    cy.get('button').contains('Salvar').click({force: true})
    cy.get('div').should('contain', 'Registro atualizado com sucesso.')
  })

  it('valida editar com delecao subcategoria', () => {
    buscar()
    
    cy.get('td button').last().click()
    cy.get('td button').first().click()

    cy.get('button').contains('Salvar').click({force: true})
    cy.get('div').should('contain', 'Registro atualizado com sucesso.')
  })

  it('valida deletar', () => {
    buscar()
    
    cy.get('td button').first().click()
    cy.get('button').contains('Sim').click({force: true})
    cy.get('div').should('contain', 'Registro deletado com sucesso.')
  })

  function buscar(){
    cy.visit(urlListagem)
    cy.get('#search').type('Categoria de Testes')
    cy.get('button').contains('Pesquisar').click({force: true})
    cy.wait(2000)
  }

  function preencherFormulario(){
    cy.get('#type')
      .first()
      .click()
      .find('span')
      .contains('RECEITA')
      .click()

    cy.get('#description').type('Categoria de Testes')
    cy.get('button').contains('Adicionar subcategoria').click({force: true})
    cy.get('.p-dialog-content').find('input').first().type('Subcategoria de Testes')
    cy.get('.p-dialog-content').find('button').contains('Salvar').click()
  }

  function validaCampoVazioFormulario(){
    cy.get('#type').first().should('contain' , 'Selecione')
    cy.get('#description').should('have.value', '')
    cy.get('input[name="active"]').should('be.checked')

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})