const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: true,
    defaultCommandTimeout: 10000,
    baseUrl: "https://www.imdb.com",
    apiBaseUrl: "https://pokeapi.co",
    screenshotsFolder: 'screenshots',
    capture: 'fullPage',
    specPattern: ['cypress/e2e/', 'cypress/api/'],
    watchForFileChanges: false
  }
})
