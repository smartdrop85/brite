const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: true,
    defaultCommandTimeout: 10000,
    baseUrl: "https://www.imdb.com/",
    screenshotsFolder: 'screenshots',
    capture: 'fullPage',
    watchForFileChanges: false
  }
})
