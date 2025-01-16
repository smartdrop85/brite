import imdb from '../objects/imdb.obj.js'

describe('Menus and operations', () => {
    beforeEach(() => {
        cy.visit('')
        cy.get(imdb.acceptCookiesButton).click()
        cy.get(imdb.openMenuButton).click()
    })

    it('2. should click set rate', () => {
        cy.contains(imdb.expandMenuItems, 'Movies').click()
        cy.contains(imdb.innerMenuItems, 'Top Box Office').click()
        cy.get(imdb.listElementsHeaders).eq(1).invoke('text').then((text) => {
            const trimmedText = text.replace(/^\d+\.\s*/, '');

            cy.get(imdb.listElementsHeaders).eq(1).click()
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

    it('3. should check breaking bad photos', () => {
        cy.contains(imdb.expandMenuItems, 'TV Shows').click()
        cy.contains(imdb.innerMenuItems, 'Top 250 TV Shows').click()
        cy.contains(imdb.listElementsHeaders, 'Breaking Bad').click()
        cy.get(imdb.profileHeader).should('be.visible').and('have.text', 'Breaking Bad')
        cy.get(imdb.photosTitle).click()
        cy.get(imdb.mediaViewer).should('be.visible')
        cy.get(imdb.photosGalleryButton).click()
        cy.get(imdb.openFilterButton).click()
        cy.get(imdb.filtersArea).should('be.visible')
        cy.get(imdb.personFilterArea).should('be.visible').and('contain', 'Person')
            .within(() => {
                cy.contains('option', 'Danny Trejo').then(option => {
                    cy.get(imdb.morePeopleDropdown).select(option.val())
                })
            })
        cy.contains(imdb.filterChips, 'Danny Trejo').parent()
            .should('be.visible').and('have.attr', 'aria-pressed', 'true')
        cy.get(imdb.closeFiltersButton).click()
        cy.get(imdb.filteredImages).each(($el) => {
            cy.wrap($el).should('be.visible')
            cy.wrap($el).invoke('attr', 'alt').should('contain', 'Danny Trejo')
        })
    })
})