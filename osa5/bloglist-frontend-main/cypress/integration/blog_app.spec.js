describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Maija Meikäläinen',
            username: 'maijajee',
            password: 'testi123'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Login')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('maijajee')
            cy.get('#password').type('testi123')
            cy.get('#loginButton').click()

            cy.contains('Maija Meikäläinen logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('maijajee')
            cy.get('#password').type('väärä')
            cy.get('#loginButton').click()

            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('maijajee')
            cy.get('#password').type('testi123')
            cy.get('#loginButton').click()
        })

        it('A blog can be created', function () {
            cy.get('#showCreateForm').click()
            cy.get('#title-input').type('Tilastoja 2')
            cy.get('#author-input').type('Pate Virtanen')
            cy.get('#url-input').type('http://google.com')
            cy.get('#createBlog').click()

            cy.contains('a new blog Tilastoja 2 by Pate Virtanen added')
            cy.contains('Tilastoja 2 Pate Virtanen')
            cy.contains('Show')
        })

        it('A blog can be liked', function () {
            cy.get('#showCreateForm').click()
            cy.get('#title-input').type('Runoja')
            cy.get('#author-input').type('Sami Saapas')
            cy.get('#url-input').type('http://google.fi')
            cy.get('#createBlog').click()
            cy.get('#showBlog').click()

            cy.contains('Likes: 0')
            cy.get('#likeBlog').click()
            cy.contains('Likes: 1')
        })

        it('A blog can be deleted', function () {
            cy.get('#showCreateForm').click()
            cy.get('#title-input').type('Tarinoita Amerikasta')
            cy.get('#author-input').type('Sam Powell')
            cy.get('#url-input').type('http://twitter.com')
            cy.get('#createBlog').click()
            cy.get('#showBlog').click()

            cy.contains('Tarinoita Amerikasta')
            cy.get('#removeBlog').click()
            cy.contains('Tarinoita Amerikasta Sam Powell').should('not.exist')
        })
    })
})