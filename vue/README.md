# js-ui

> Dockerian JsUI


<br/><a name="contents"></a>
## Contents

  - [User Guide](public/static/README.md)
  - [Design in Vue.js](src/README.md)
  - [Build Setup](#build)
  - [Using IDE](#ide)



<a name="build"><br/></a>
## Build Setup

```bash
# install dependencies
npm install
```

### Compiles and hot-reloads for development

```bash
# serve with hot reload at localhost:8080
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Run your unit tests

```bash
npm run test:unit
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Run all tests

```bash
npm test
```


<a name="ide"><br/></a>
## Debug and test with IDE

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Visual Studio Code

  * Install the following extensions for Vue
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

  * Edit configurations (from `Debug` menu) to add tests in "configurations" section.
    See example of [launch.json](../.vscode/launch.json)

    ```
    {
      // Use IntelliSense to learn about possible attributes.
      // Hover to view descriptions of existing attributes.
      // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
      "version": "0.2.0",
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Current Vue Test",
          "program": "${workspaceFolder}/vue/node_modules/jest/bin/jest",
          "args": ["--config", "test/unit/jest.conf.js", "${relativeFile}"],
          "console": "integratedTerminal",
          "internalConsoleOptions": "neverOpen",
          "cwd": "${workspaceFolder}/vue"
        },
        {
          "type": "node",
          "request": "launch",
          "name": "All Vue Tests",
          "program": "${workspaceFolder}/vue/node_modules/jest/bin/jest",
          "args": ["--config", "test/unit/jest.conf.js", "--coverage"],
          "console": "integratedTerminal",
          "internalConsoleOptions": "neverOpen",
          "cwd": "${workspaceFolder}/vue"
        }
      ]
    }
    ```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
