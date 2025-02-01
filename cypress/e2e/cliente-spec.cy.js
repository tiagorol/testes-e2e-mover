describe('Crud Cliente Spec', () => {

  const urlBase = 'https://moverfrotas.netlify.app/'
  const urlListagem = urlBase + 'clients'
  const urlNovo = urlBase +  '/clients/new'

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

  it('valida CPF', () => {
    cy.visit(urlNovo)

    preencherFormulario()
    cy.get('#cpf').clear().type('123456789')
    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'CPF inválido.')
  })

  it('valida busca CEP', () => {
    cy.visit(urlNovo)

    cy.get('#postalCode').type('60821802')
    cy.get('#number').type('1555')
    cy.wait(1000)
    cy.get('#publicPlace').should('have.value', 'AVENIDA OLIVEIRA PAIVA')
    cy.get('#neighborhood').should('have.value', 'PARQUE MANIBURA')
    cy.get('#city').should('have.value', 'FORTALEZA')
    cy.get('#state').first().should('contain' , 'CEAR')
  })

  it('valida email', () => {
    cy.visit(urlNovo)
    preencherFormulario()
    cy.get('#email').clear().type('fulanodetal')

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'E-mail inválido.')
  })

  it('valida telefoneFixo', () => {
    cy.visit(urlNovo)
    preencherFormulario()
    cy.get('#telephone').clear().type('859999')

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Telefone fixo inválido.')
  })

  it('valida telefoneCelular', () => {
    cy.visit(urlNovo)
    preencherFormulario()
    cy.get('#cellPhone').clear().type('859999')

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Telefone celular inválido.')
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

  it('valida editar com delecao contato', () => {
    buscar()
    
    cy.get('td button').last().click()
    cy.get('td button').first().click()

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'Registro atualizado com sucesso.')
  })

  it('valida deletar', () => {
    buscar()
    
    cy.get('td button').eq(1).click()
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
    cy.get('#cpf').type('81591190037')
    cy.get('#rg').type('9999999999')
    cy.get('#dateBirth').type('03111980')
    cy.get('#motherName').type('Mãe de Fulano de Tal')
    cy.get('#postalCode').type('60822999')
    cy.get('#number').type('1555')
    cy.wait(1000)
    cy.get('#publicPlace').type('Rua das Flores')
    cy.get('#neighborhood').type('Centro')
    cy.get('#city').type('Fortaleza')

    cy.get('#state')
      .first()
      .click()
      .find('p-dropdownitem')
      .contains('ALAGOAS')
      .click()

    cy.get('#complement').type('Bl 01 apto 601')
    cy.get('#email').type('fulanodetal@gmail.com')
    cy.get('#telephone').type('8599999999')
    cy.get('#cellPhone').type('85999999999')

    cy.get('button').contains('Contatos').click()
    cy.get('#namefull').type('Contato de Teste')
    cy.get('#phone').type('85999999999')
    cy.get('#degreeKinship').type('Amigo')
    cy.get('.p-dialog-content').find('button').contains('Salvar').click()
  }

  function validaCampoVazioFormulario(){
    cy.get('#typePerson').first().should('contain' , 'PESSOA FÍSICA')
    cy.get('#name').should('have.value', '')
    cy.get('#cpf').should('have.value', '')
    cy.get('#rg').should('have.value', '')
    cy.get('#dateBirth').should('have.value', '')
    cy.get('#motherName').should('have.value', '')
    cy.get('#postalCode').should('have.value', '')
    cy.get('#publicPlace').should('have.value', '')
    cy.get('#number').should('have.value', '')
    cy.get('#neighborhood').should('have.value', '')
    cy.get('#city').should('have.value', '')
    cy.get('#state').first().should('contain' , 'Selecione')
    cy.get('#complement').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#telephone').should('have.value', '')
    cy.get('#cellPhone').should('have.value', '')

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})