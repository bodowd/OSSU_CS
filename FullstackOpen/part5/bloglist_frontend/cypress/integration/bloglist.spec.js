describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // register user
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#loginUsername').type('mluukkai')
      cy.get('#loginPassword').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('Matti Luukkainen logged in')
      cy.get('#notification')
        .contains('welcome back Matti Luukkainen!')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#loginUsername').type('mluukkai')
      cy.get('#loginPassword').type('wrong')
      cy.get('#loginButton').click()

      cy.get('#notification')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('.blogFormTitle').type('new blog')
        cy.get('.blogFormAuthor').type('new author')
        cy.get('.blogFormUrl').type('url')
        cy.get('.submitBlogButton').click()

        cy.contains('new blog')
        cy.contains('new author')
        cy.contains('url')

        cy.get('#notification')
          .contains('new blog by new author added!')
      })

      describe('and a blog exists', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'blog1',
            author: 'new author',
            url: 'new url'
          })
        })

        it('A blog can be liked', function() {
          cy.contains('view').click()
          cy.get('#likeButton').click()
          cy.get('.likes')
            .contains('1')
        })

        it('A blog can be deleted', function() {
          cy.contains('view').click()
          cy.get('#removeButton').click()

        })

        it('blogs are ordered by likes', function(){
          cy.createBlog({
            title: 'blog2',
            author: 'author1',
            url: 'url1'
          })
          cy.createBlog({ title: 'blog3', author: 'author2', url: 'url2' })

          cy.contains('blog1').as('blog1')
          cy.contains('blog2').as('blog2')
          cy.contains('blog3').as('blog3')


          cy.get('@blog1').contains('view').click()
          cy.get('@blog2').contains('view').click()
          cy.get('@blog3').contains('view').click()


          cy.get('@blog1').parent().contains('like').as('like1')
          cy.get('@blog2').parent().contains('like').as('like2')
          cy.get('@blog3').parent().contains('like').as('like3')

          cy.get('@like1').click()
          cy.wait(500)
          cy.get('@like1').click()
          cy.wait(500)
          cy.get('@like1').click()
          cy.wait(500)

          cy.get('@like2').click()
          cy.wait(500)
          cy.get('@like2').click()
          cy.wait(500)

          cy.get('.likes').then(blogs => {
            cy.wrap(blogs[0]).contains('likes: 3')
            cy.wrap(blogs[1]).contains('likes: 2')
            cy.wrap(blogs[2]).contains('likes: 0')
          })
        })
      })
    })
  })
})