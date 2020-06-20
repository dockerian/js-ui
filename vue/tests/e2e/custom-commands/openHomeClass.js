/**
 * A class-based Nightwatch custom command which is a variation
 *  of the openHomeAboutPage.js command.  The command name is the
 *  filename and class needs to contain a "command" method.
 *
 * Example usage:
 *   browser.openHomeClass();
 *
 * For more information on writing custom commands see:
 *   https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
 *
 */

const assert = require('assert')

module.exports = class {
  async command () {
    // Other Nightwatch commands are available via "this.api"
    this.api.init()
    this.api.waitForElementVisible('#app')

    const result = await this.api.elements('css selector', '.main a')
    assert.strictEqual(result.value.length, 9)
  }
}
