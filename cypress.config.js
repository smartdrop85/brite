const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
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
