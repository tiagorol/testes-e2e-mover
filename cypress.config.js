const { defineConfig } = require('cypress')

module.exports = defineConfig({

  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    // e2e options here
  },

  env: {
    urlBase: 'https://moverfrotashom.netlify.app/'
  }
})
