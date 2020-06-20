////////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
////////////////////////////////////////////////////////////////

module.exports = {
  beforeEach: (browser) => browser.init(),

  'e2e tests using page objects': (browser) => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')

    const app = homepage.section.app
    app.assert.elementCount('@image', 3)
    app.expect.section('@main').to.be.visible
    app.expect.section('@title').text.to.match(/^Dockerian JsUi$/)
    browser.end()
  },

  'text "localhost:8001" is within api info': (browser) => {
    const homepage = browser.page.homepage()
    const mainSection = homepage.section.app.section.main

    mainSection.expect.element('@apiUrl').text.to.contain('localhost:8001')
  }
}
