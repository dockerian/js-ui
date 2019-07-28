require('babel-register')
var config = require('../../config')

var fs = require('fs')
var chromeDriver = require('chromedriver').path || {}
var chromeDriverBinPath = '/usr/bin/chromedriver' // installed from, e.g. chromium-chromedriver
var chromeDriverPath = fs.existsSync(chromeDriverBinPath) ? chromeDriverBinPath : chromeDriver

console.log("[nightwatch] chromedriver:", chromeDriverPath)

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      // 'webdriver.chrome.driver': require('chromedriver').path
      // In order to use inside docker container, chrome driver seems to be
      // installed by, e.g. chromium-chromedriver, at `/usr/bin/chromedriver`.
      'webdriver.chrome.driver': chromeDriverPath
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless', 'disable-gpu']
        }
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
