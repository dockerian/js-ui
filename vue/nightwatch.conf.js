var config = require('./config')

var fs = require('fs')
var chromeDriver = require('chromedriver').path || {}
var chromeDriverBinPath = '/usr/bin/chromedriver' // installed from, e.g. chromium-chromedriver
var chromeDriverPath = fs.existsSync(chromeDriverBinPath) ? chromeDriverBinPath : chromeDriver

console.log("[nightwatch] chromedriver:", chromeDriverPath)

// https://nightwatchjs.org/gettingstarted/configuration/
module.exports = {
  src_folders: ['tests/e2e/specs'],
  output_folder: 'tests/e2e/reports',
  custom_assertions_path: ['tests/e2e/custom-assertions'],

  // only used when `vue-cli-service test:e2e --use-selenium`
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

  webdriver: {
    start_process: true,
    server_path: chromeDriverPath,
    cli_args: [
      '--verbose'
    ],
    host: '127.0.0.1',
    port: 9515
  },

  test_settings: {
    default: {
      desiredCapabilities : {
        browserName: 'chrome'
      },
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      silent: true,
      globals: {
        devServerURL: 'http://127.0.0.1:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless', 'disable-gpu', 'no-sandbox']
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
