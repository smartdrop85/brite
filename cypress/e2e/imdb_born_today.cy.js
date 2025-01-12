import imdb from '../objects/imdb.obj.js'

describe('Born today filters', () => {
    const todayDate = Cypress.dayjs().format('MM-DD')
    const filterSelectorToday = `[data-testid=selected-input-chip-list-birthday-${todayDate}]`
    const yesterdayDate = Cypress.dayjs().subtract(1, 'day').format('MM-DD')
    const filterSelectorYesterday = `[data-testid=selected-input-chip-list-birthday-${yesterdayDate}]`
    const today40yearsAgo = Cypress.dayjs().subtract(40, 'year').format('YYYY-MM-DD')
    const today40yearsAgoFilter = Cypress.dayjs().subtract(40, 'year').format('MMMM D, YYYY')

    beforeEach(() => {
        cy.visit('')
        cy.get(imdb.acceptCookiesButton).click()
        cy.get(imdb.openMenuButton).click()
        cy.contains(imdb.expandMenuItems, 'Celebs').click()
        cy.contains(imdb.innerMenuItems, 'Born Today').click()
        cy.get(imdb.header).should('be.visible').and('have.text', 'Advanced name search')
        cy.get(filterSelectorToday).should('be.visible').and('contain', 'Birthday')
        cy.get(filterSelectorToday).click()
    })

    it('should filter by Born yesterday and take screenshot', () => {
        cy.get(imdb.birthdayAccordion).should('be.visible')
            .and('have.text', 'Birthday')
        cy.get(imdb.birthdayAccordion).click()
        cy.get(imdb.birthdayInputField).type(`${yesterdayDate}{enter}`)
        cy.get(imdb.seeResultsButton).should('be.visible').and('have.text', 'See results')
        cy.get(imdb.seeResultsButton).click()
        cy.get(filterSelectorYesterday).should('be.visible').and('have.text', `Birthday: ${yesterdayDate}`)

        cy.get(imdb.listElementsHeaders).eq(2).invoke('text').then((text) => {
            const trimmedText = text.replace(/^\d+\.\s*/, '');

            cy.get(imdb.listElementsHeaders).eq(2).click()
            cy.get(imdb.profileHeader).should('be.visible').and('have.text', trimmedText)
        })
        cy.screenshot()
    })

    it('should filter by Birth date 40 years ago and take screenshot', () => {
        cy.get(imdb.birthDateAccordion).should('be.visible')
            .and('contain.text', 'Birth date')
        cy.get(imdb.birthDateAccordion).click()
        cy.get(imdb.birthDateStartField).should('be.visible').and('have.attr', 'value', '')
        cy.get(imdb.birthDateStartField).type(today40yearsAgo)
        cy.get(imdb.birthDateEndField).should('be.visible').and('have.attr', 'value', '')
        cy.get(imdb.birthDateEndField).type(today40yearsAgo)

        cy.get(imdb.seeResultsButton).should('be.visible').and('have.text', 'See results')
        cy.get(imdb.seeResultsButton).click()
        cy.get(imdb.birthDateFilterChip).should('be.visible')
            .and('have.text', `Birth date: ${today40yearsAgoFilter}`)

        cy.get(imdb.listElements).eq(0).within(($el) => {
            const content = $el.contents()

            if (content.find(imdb.listElementsContentLinks).length) {
                cy.get(imdb.listElementsContentLinks).first().click()
            } else {
                cy.log('No links found in entry description, taking results screenshot as is')
            }
        })

        cy.screenshot()
    })
})