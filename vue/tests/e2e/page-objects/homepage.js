/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
  url: '/about',
  commands: [],

  // A page object can have elements
  elements: {
    appContainer: '#app'
  },

  // Or a page objects can also have sections
  sections: {
    app: {
      selector: '#app',

      elements: {
        image: 'img'
      },

      // - a page object section can also have sub-sections
      // - elements or sub-sections located here are retrieved using the "app" section as the base
      sections: {
        title: {
          selector: 'h1'
        },

        main: {
          // the equivalent selector for main section: '#app div.main'
          selector: 'div.main',

          elements: {
            logo: 'img',
            apiUrl: {
              selector: 'td.rest-url',
              index: 0
            }
          }
        }
      }
    }
  }
}
