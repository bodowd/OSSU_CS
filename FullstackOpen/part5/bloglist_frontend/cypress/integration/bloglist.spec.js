describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('login form is the default', function() {
    cy.visit('http://localhost:3000')
    cy.get('#loginUsername')
    cy.get('#loginPassword')
  })
})