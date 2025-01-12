import imdb from '../objects/imdb.obj.js'

describe('Search: Nicolas Cage', () => {
    it('should search and check profile', () => {
        cy.visit('')
        cy.get(imdb.acceptCookiesButton).click()
        cy.get(imdb.searchField).should('be.visible')
            .and('have.attr', 'placeholder', 'Search IMDb')
        cy.get(imdb.searchField).type('Nicolas Cage')
        cy.get(imdb.searchResultArea).should('be.visible')
            .and('contain', 'Nicolas Cage')
        cy.contains(imdb.searchResultArea, 'Nicolas Cage').click()
        // check profile
        cy.get(imdb.profileHeader).should('be.visible')
            .and('have.text', 'Nicolas Cage')
        cy.get(imdb.upcomingAccordionActor).click()
        cy.get(imdb.upcomingProjectsArea).within(() => {
            cy.contains(imdb.projectElements, 'Completed').first().click()
        })
        cy.get(imdb.movieStatus).should('be.visible')
            .and('contain', 'Completed')
    });
});