import imdb from '../objects/imdb.obj.js'

describe('Menus and operations', () => {
    beforeEach(() => {
        cy.visit('')
        cy.get(imdb.acceptCookiesButton).click()
        cy.get(imdb.openMenuButton).click()
    })

    it('should click set rate', () => {
        cy.contains(imdb.expandMenuItems, 'Movies').click()
        cy.contains(imdb.innerMenuItems, 'Top Box Office').click()
        cy.get(imdb.movieElements).eq(1).invoke('text').then((text) => {
            const trimmedText = text.replace(/^\d+\.\s*/, '');

            cy.get(imdb.movieElements).eq(1).click()
            cy.get(imdb.profileHeader).should('be.visible').and('have.text', trimmedText)
        })
        cy.get(imdb.ratingButton).eq(1).should('be.visible')
            .and('have.text', 'Rate')
        cy.get(imdb.ratingButton).eq(1).click()
        cy.get(imdb.ratingModal).should('be.visible')
        cy.contains(imdb.ratingModalButtons, 'Rate').should('be.visible')
            .and('be.disabled')
        cy.get(imdb.rate5Star).click( {force: true} )
        cy.contains(imdb.ratingModalButtons, 'Rate').should('not.be.disabled').click()
        cy.get(imdb.signinOptions).should('be.visible')
    })

    it.only('should check breaking bad photos', () => {

    })
})