describe('Burrito Builder App', () => {

  beforeEach(() => {
    cy.fixture('burritoData').then((orders) => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: orders
        })
      })

    cy.fixture('newBurrito').then((newBurrito) => {
      cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: newBurrito
      })
    })

    cy.visit('http://localhost:3000')
  })

  it('Should show a user the page title', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('Should show a user pre-existing orders with names and ingredients', () => {
    cy.get('div[class="order"]')
      .get('h3').contains('Pat')
      .get('li').contains('beans')
      .get('h3').contains('Sam')
      .get('li').contains('steak')
      .get('h3').contains('Alex')
      .get('li').contains('sofritas')
  })

  it('Should show the user a form with a name input and buttons with ingredients', () => {
    cy.get('form').contains('Order: Nothing selected')
      .get('input[type="text"]')
      .get('button[name="beans"]').contains('beans')
      .get('button[name="sour cream"]').contains('sour cream')
  })

  it('Should allow the user to submit a new order with their name and at least one ingredient', () => {
    cy.get('input[type="text"]').type('Ashton')
      .should('have.value', 'Ashton')
      .get('button').contains('beans').click()
      .get('button').contains('queso fresco').click()
      .get('button').contains('carnitas').click()
      .get('button').contains('Submit Order').click()
      .get('h3').contains('Ashton')
  })

  it('Should only allow a user to submit if there is a name and at least one ingredient', () => {
    cy.get('input[type="text"]').type('Ashton')
      .should('have.value', 'Ashton')
      .get('button').contains('Submit Order').click()
      .get('h4').contains('Sorry, you must enter a name and at least one ingredient to order!')
  })

  
})

