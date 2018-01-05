# Dev Setup and Installation

This is to document setup and tools for [js-ui](../README.md) (Dockerian JsUi) project.


<br/><a name="contents"></a>
## Contents

  * [Dev Setup](#dev-setup)
  * [Installing Node.js](#install-node)
  * [Initializing a JavaScript project](#install-js)
    - [AngularJS](#install-js-ng)
    - [ReactJS](#install-js-react)
    - [VueJS](#install-js-vue)
  * [JavaScript Library/Frameworks](./JSF.md)
  * [Build, test, and run the project](#build-test-run)
  * [Dockerization](#docker)


<a name="dev-setup"><br/></a>
## Dev Setup

  For a developer with GitHub account, e.g. "jasonzhuyx", working
  on [fork](https://github.com/dockerian/js-ui#fork-destination-box) -

  ```
  export WORKSPACE=$HOME/projects
  mkdir -p "$WORKSPACE"; cd "$WORKSPACE"
  git clone git@github.com:jasonzhuyx/js-ui.git
  cd js-ui
  git remote add upstream git@github.com:dockerian/js-ui.git
  git fetch --all -v
  ```

  Additionally, install prerequisite tools for this project:
  - awk, egrep, find, grep, sort, tee, xargs, zip
  - Node.js and npm - see [Installing Node.js](#install-node)
  - JSON query tool: [jq](https://stedolan.github.io/jq/download/)



<a name="install-node"><br/></a>
## Installing Node.js

  Use [download](https://nodejs.org/en/download/)
  or [package manager](https://nodejs.org/en/download/package-manager/) to
  setup [node.js](https://nodejs.org) on,
  e.g. [ubuntu](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

  ```
  curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo apt-get install -y build-essential
  ```
  or [macOS](https://nodejs.org/en/download/package-manager/#macos)

  ```
  curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

  # alternatively by Homebrew
  brew install node
  ```

  After the installation, check `node` and `npm` versions:

  ```
  node -v  # node --version
  npm -v   # npm --version
  ```


<a name="install-js"><br/></a>
## Initializing a JavaScript project

  Dockerian JsUi project starts prototyping web UI consoles with the following
  3 major JavaScript library/frameworks.

  See [here](../JSF.md) for tech stack options.

<a name="install-js-ng"></a>
### Angular CLI

  This project uses [Angular CLI](https://cli.angular.io/) to initialize, develop,
  scaffold and maintain js-ui as an [Angular/ng2](https://angular.io/) application.

  ```
  npm install -g @angular/cli

  export JSF=ng
  ng new js-ui && mv js-ui $JSF  # or keep `js-ui` as a project folder
  cd $JSF && npm start  # which runs `ng serve`
  ```
  **Note**:
  - For chrome headless test, configure `karma.conf.js`.
  - The default serve port is `4200`.
    Edit the cli configuration [.angular-cli.json](../ng/.angular-cli.json) and
    add a `serve.port` under `defaults` key:

    ```
    "defaults": {
      "serve": {
        "host": "0.0.0.0",
        "port": 8080
      },
    }
    ```
    Optionally, run the `ng serve` with `--port`:

    ```
    ng serve --host 0.0.0.0 --port 8080
    ```

  See [documentation](https://github.com/angular/angular-cli/wiki).


<a name="install-js-react"></a>
### React

  This projects use [create-react-app](https://github.com/facebookincubator/create-react-app)
  cli to initialize js-ui as a React.js application.

  ```
  npm install -g create-react-app

  export JSF=react
  create-react-app js-ui && mv js-ui $JSF  # or keep `js-ui` as a project folder
  cd $JSF && npm start
  ```
  **Note**:
  - For non-interactive testing, set `test` in npm scripts to `CI=true react-scripts test --env=jsdom`.
  - The default serve port is `3000`.
    Edit/Create configuration file [.env](../react/.env) and
    change/add a customized `PORT` setting:

    ```
    PORT=8080
    ```

  See [package](https://www.npmjs.com/package/create-react-app)
  and [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)


<a name="install-js-vue"></a>
### Vue CLI

  This project uses [vue-cli](https://github.com/vuejs/vue-cli) to scaffold
  js-ui as a Vue.js project.

  ```
  npm install -g vue-cli

  export JSF=vue
  vue init webpack js-ui && mv js-ui $JSF  # or keep `js-ui` as a project folder
  cd $JSF && npm start  # which runs `npm run dev` by default
  ```
  **Note**:
  - The default serve host is `localhost`, and port is `8080`.
  - Both host and port can be overwritten by environment variables `HOST` and `PORT`.
  - For headless e2e testing, add the following under `test_settings.default`
    or `test_settings.chrome` in `test/e2e/nightwatch.conf.js`

    ```
    chromeOptions: {
      args: ['headless', 'disable-gpu']
    }
    ```

  See [source](https://github.com/vuejs/vue-cli)
  and [guide](https://vuejs.org/v2/guide/).



<br/><a name="build-test-run"><br/></a>
## Build, test, and run the project

  This project provides both `Makefile` and npm scripts for building, testing,
  and serving the application, with options to switch between
  JavaScript library/framework, e.g. ng/react/vue.

  ```
  # build the project
  JSF=react make build  # or `(cd react; npm build)`

  # run both e2e and unit tests
  JSF=vue DONT_RUN_DOCKER=1 make test  # or `(cd vue; npm test)`

  # start the server
  JSF=ng make start     # or `(cd ng; npm start)`
  ```

  **Note**:
  - Not all JavaScript library/frameworks are fully supported and maintained.
    See the latest commit on [github](https://github.com/dockerian/js-ui).
  - Check out [Makefile](../Makefile) for default `JSF` setting.
  - Headless Chrome is not available in Dockerfile yet.


<br/><a name="docker"><br/></a>
## Dockerization

### Install Docker

  See
  [Install Docker Platform](https://www.docker.com/products/overview#/install_the_platform)
  or
  [Docker Toolbox](https://www.docker.com/products/docker-toolbox)

### Build Docker container

  Makefile has provided a `docker` script to build docker container.

  ```
  make docker
  ```
  or

  ```
  # current path is the source root where Dockerfile exists
  docker build -t dockerian/js-ui .
  ```

### Start Docker container

  Recommend to run inside the docker container, simply by

  ```
  make cmd  # which starts a bash shell in the container
  ```
  or

  ```
  docker run -it --rm --name js-ui \
    -v "$PWD":/src/js-ui dockerian/js-ui
  ```

  Now all node runtime environment is available (in the container);
  otherwise, using the hybrid script `run.sh` to call any `Makefile` target,
  default is `test` :

  ```
  tools/run.sh  # inside or outside of the container
  ```

  For starting up the server:

  ```
  make start
  ```

### Command aliases

  Here are some bash shell command aliases for docker cli

  ```
  alias dclean='docker kill $(docker ps -aq); docker rm -f -v $(docker ps -aq); docker rmi -f $(docker images -aq)'
  alias di="docker images|grep -v none"
  alias dia="docker images -a"
  alias didangling="docker images -a --filter dangling=true"
  alias dlogs="docker logs -ft "
  alias dps="docker ps -a"
  alias drm="docker rm -f -v"
  alias drma='docker rm -f -v $(docker ps -aq)'
  alias drme='docker rm -f -v $(docker ps -aq --filter "status=exited")'
  alias drmi="docker rmi -f "
  ```

  and a function to extract config in a docker image

  ```
  function dex() {
    docker history --no-trunc "$1" | \
    sed -n -e 's,.*/bin/sh -c #(nop) \(MAINTAINER .[^ ]\) 0 B,\1,p' | \
    head -1
    docker inspect --format='{{range $e := .Config.Env}}
    ENV {{$e}}
    {{end}}{{range $e,$v := .Config.ExposedPorts}}
    EXPOSE {{$e}}
    {{end}}{{range $e,$v := .Config.Volumes}}
    VOLUME {{$e}}
    {{end}}{{with .Config.User}}USER {{.}}{{end}}
    {{with .Config.WorkingDir}}WORKDIR {{.}}{{end}}
    {{with .Config.Entrypoint}}ENTRYPOINT {{json .}}{{end}}
    {{with .Config.Cmd}}CMD {{json .}}{{end}}
    {{with .Config.OnBuild}}ONBUILD {{json .}}{{end}}' "$1"
  }
  ```

### Clean up

  ```
  docker rm -f $(docker ps -a | grep js-ui | awk '{print $1}')
  docker rmi -f $(docker images -a | grep js-ui | awk '{print $1}')
  ```
  or cleaning docker process and image in part of `clean-all`

  ```
  make clean-all
  ```




<br/><div>
<a href="https://github.com/dockerian" style="text-decoration:none;"><img src="https://avatars.githubusercontent.com/u/22064108" style="border:0;height:50;width:50px;" height="50" alt="dockerian" border="0" title="Dockerian" align="right" valign="top" /></a>
</div>

&raquo; Back to <a href="#contents">Contents</a> | <a href="../README.md">Home</a> &laquo;
