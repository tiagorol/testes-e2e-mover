describe('Crud Cliente Spec', () => {

  const urlBase = 'https://moverfrotas.netlify.app/'
  const urlListagem = urlBase + 'search/clients'
  const urlNovo = urlBase +  'register/clients/new'

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

  it.only('valida email', () => {
    cy.visit(urlNovo)
    preencherFormulario()
    cy.get('#email').clear().type('fulanodetal')

    cy.get('button').contains('Salvar').click()
    cy.get('div').should('contain', 'E-mail inválido.')
  })

  // it('valida salvar', () => {
  //   cy.visit(urlNovo)
  //   preencherFormulario()

  //   cy.get('button').contains('Salvar').click()
  //   cy.get('div').should('contain', 'Registro cadastrado com sucesso.')
  // })

  // it('valida buscar', () => {
  //   buscar()

  //   cy.get('td').should('contain', 'FULANO DE TAL')
  // })

  // it('valida editar', () => {
  //   buscar()
    
  //   cy.get('td button').last().click()
  //   cy.get('button').contains('Salvar').click()
  //   cy.get('div').should('contain', 'Registro atualizado com sucesso.')
  // })

  // it('valida deletar', () => {
  //   buscar()
    
  //   cy.get('td button').first().click()
  //   cy.get('button').contains('Sim').click()
  //   cy.get('div').should('contain', 'Registro deletado com sucesso.')
  // })

  // function buscar(){
  //   cy.visit(urlListagem)
  //   cy.get('#search').type('Fulano de')
  //   cy.get('button').contains('Pesquisar').click()
  //   cy.wait(2000)
  // }

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
  }

  function validaCampoVazioFormulario(){
    cy.get('#typePerson').first().should('contain' , 'PESSOA FÍSICA')
    cy.get('#name').should('be.empty')
    cy.get('#cpf').should('be.empty')
    cy.get('#rg').should('be.empty')
    cy.get('#dateBirth').should('be.empty')
    cy.get('#motherName').should('be.empty')
    cy.get('#postalCode').should('be.empty')
    cy.get('#publicPlace').should('be.empty')
    cy.get('#number').should('be.empty')
    cy.get('#neighborhood').should('be.empty')
    cy.get('#city').should('be.empty')
    cy.get('#state').first().should('contain' , 'Selecione')
    cy.get('#complement').should('be.empty')
    cy.get('#email').should('be.empty')
    cy.get('#telephone').should('be.empty')
    cy.get('#cellPhone').should('be.empty')

    cy.get('button').contains('Salvar').should('be.disabled')
    cy.get('button').contains('Cancelar').should('be.enabled')
  }

})