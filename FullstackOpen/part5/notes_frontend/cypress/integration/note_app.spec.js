describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function() {
    cy.contains('log in').click()
    // cy.get allows for searching by CSS selectors
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    // we gave the submit button the id login-button to avoid name conflicts with the above log in click which looks for text
    // both buttons are in the application's DOM the whole time, but only one is visible at a time because of the display:none styling on one of them
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged-in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .contains('Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function() {
    // tested the login flow already. Instead of using the form again and again, bypass the UI and do an HTTP request to the backend to log in
    beforeEach(function() {
      // custom commands declared in cypress/support/commands.js
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function() {
      cy.contains('make new note').click()
      cy.get('#inputNewNote').type('a note created by cypress')
      cy.get('#submitNewNote').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function() {
        // use find because cy.get will search the whole page and return all 5 buttons
        cy.contains('another note cypress').parent().find('button').click()

        cy.contains('another note cypress').parent().find('button').should('contain', 'make not important')
      })
    })

    describe('and several', function() {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        // store the button as theButton and the following line can use the named element
        cy.contains('second note')
          .parent()
          .find('button')
          .as('theButton')
        
        cy.get('@theButton').click()

        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })



})
