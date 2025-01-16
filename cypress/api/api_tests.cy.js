describe('PokeApi tests', { baseUrl: Cypress.config('apiBaseUrl') },() => {
    let validName
    let validId

    beforeEach(() => {
        cy.request('GET', '/api/v2/berry')
            .then((response) => {
                expect(response.status).to.eq(200)
                validName = response.body.results[0].name
                validId = response.body.results[0].url.split('/')[6]
            })
    })

    it('1. call with valid id', () => {
        cy.request('GET', `/api/v2/berry/${validId}`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.not.be.empty
        })
    })

    it('1.1 call with invalid id', () => {
        const invalidId = 0

        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: `/api/v2/berry/${invalidId}`
                }).then((response) => {
                    expect(response.status).to.eq(404)
                    expect(response.body).to.eq('Not Found')
            }
        )
    })

    it('2. call with valid name', () => {
        cy.request('GET', `/api/v2/berry/${validName}`).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(validName)
        })
    })

    it('2.1 call with invalid name', () => {
        const invalidName = `${validName}invalidating`

        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: `/api/v2/berry/${invalidName}`
                }).then((response) => {
                    expect(response.status).to.eq(404)
                    expect(response.body).to.eq('Not Found')
            }
        )
    })

    it('3. find the most spicy berry and call its url', () => {
        // get all berry flavors
        cy.request('GET', '/api/v2/berry-flavor').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.results).to.not.be.empty

            // picking up 'spicy' flavor URL
            const spicyBerryObj = response.body.results.find((url) => url.name === 'spicy')

            // call the spicy flavor URL
            cy.request('GET', spicyBerryObj.url).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('spicy')
                expect(response.body.berries).to.not.be.empty

                // pick the berry with more potency
                const mostSpicyBerryObj = response.body.berries.reduce((acc, curr) => {
                    return acc.potency > curr.potency ? acc : curr
                })

                cy.log('Most spicy berry found: ', mostSpicyBerryObj.berry.name)

                const highestPotency = response.body.berries.reduce((acc, curr) => {
                    return acc > curr.potency ? acc : curr.potency
                }, 0)
                cy.log('Most spicy berry potency: ', highestPotency)

                // call the berry URL and check response
                cy.request('GET', mostSpicyBerryObj.berry.url).then((response) => {
                    expect(response.status).to.eq(200)
                    // check name is as expected
                    expect(response.body.name).to.eq(mostSpicyBerryObj.berry.name)
                    // check potency is as expected
                    const findCurrentSpicyFlavor = response.body.flavors.find((flavor) => flavor.flavor.name === 'spicy')
                    expect(findCurrentSpicyFlavor.potency).to.eq(highestPotency)
                })
            })
        })
    })
})