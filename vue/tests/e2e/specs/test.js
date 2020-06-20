// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('#about')
      .assert.containsText('h1', 'Dockerian JsUi')
      .assert.elementCount('img', 3)
      .end()
  },

  'e2e test using custom commands': browser => {
    browser
      .openHomeClass()
      .openHomeAboutPage()
      .assert.elementPresent('.main')
      .end()
  }
}
