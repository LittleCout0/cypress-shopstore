const { defineConfig } = require("cypress")

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 15000,
  env: {
    url: "https://rahulshettyacademy.com/client",
  },
  e2e: {
    specPattern: "cypress/e2e/*.cy.js",
  },
  retries: {
    runMode: 0,
  },
  projectId: "WebStore Automation",
})
