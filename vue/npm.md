# Node Package Management
## Package Upgrading (Webpack 3 to Webpack 4)


<br/><a id="contents"></a>
## Contents
  * [Updating Existing Dependencies](#updating-existing)
  * [utils.js](#utils)
  * [webpack.prod.conf.js](#webpack-conf)

<br/><a id="updating-existing"></a>
## Updating Existing Dependencies

  In order to upgrade from Webpack 3 to Webpack 4, there are several dependencies that must be updated. The correct versions of the required dependencies are listed below:

  * `webpack: "^4.39.3"`
  * `webpack-dev-middleware: "^2.0.6"`
  * `webpack-dev-server: "^3.8.0"`
  * `html-webpack-plugin: "^3.2.0"`
  * `inject-loader: "^4.0.1"`

  These updates can be done by navigating to `js-ui/vue` in terminal and running:

  * `npm install <dependency name>@<version>`

  eg:

  * `npm install webpack@4.39.3`

  The dependency `extract-text-webpack-plugin` has been completely deprecated. It can be uninstalled by running:

  * `npm uninstall extract-text-webpack-plugin`

  In replacement of `extract-text-webpack-plugin` a new plugin (`mini-css-extract-plugin`) will be required. This can be installed by running:

  * `npm install mini-css-extract-plugin@0.8.0`

  
<br/><a id="utils"></a>
## utils.js

  After replacing `extract-text-webpack-plugin` navigate to `vue/build/utils.js`.
  At the top of this file (~Line 4) replace:

  ```
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  ```

  With:

  ```
  const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
  ```

  In this same file scroll down (~Line 47) and replace:

  ```
  if (options.extract) {
    return ExtractTextPlugin.extract({
  ```

  With:

  ```
  if (options.exports) {
    return MiniCSSExtractPlugin.extract({
  ```


<br/><a id="webpack-conf"></a>
## webpack.prod.conf.js

  After replacing `extract-text-webpack-plugin` navigate to `vue/build/webpack.prod.conf.js`.
  At the top of this file (~Line 10) replace:

  ```
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  ```

  With:

  ```
  const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
  ```

  In this same file scroll down (~Line 49) and replace:

  ```
  new ExtractTextPlugin({
  ```

  With:

  ```
  new MiniCSSExtractPlugin({
  ```