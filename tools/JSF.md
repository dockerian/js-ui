# JavaScript Frameworks and Library

Developer notes on learning and using JavaScript library and frameworks.


<br/><a name="contents"></a>
## Contents

  * [Installing JavaScript Frameworks](#install-js)
    - [AngularJS](#install-js-ng)
    - [ReactJS](#install-js-react)
    - [VueJS](#install-js-vue)
  * [JavaScript Frameworks](#js-frameworks)
  * [UI Component Frameworks](#ui-components)
    - [CSS Frameworks](#cssf)
    - [Component Frameworks](#js-cf)
    - [Vue.js Components](#vue-cf)
      - [Comparison - Frameworks](#vue-cf-comparison)
      - [Comparison - Tables](#vue-cf-tables)
  * [JavaScript Language](#js-lang)
    - [ES5](#es5)
    - [ES6](#es6)
  * [Study Notes](#study-notes)
    - [async/await vs promise](#async)
    - [debugging](#debug)
    - [Functional Programming](#functional-programming)
    - [Flux](#flux)
    - [React Patterns](#react-patterns)
    - [Vue.js](#vuejs)
  * [Others](#others)



<a name="install-js"><br/></a>
## Installing JavaScript Frameworks

  Prerequisite: [Node.js](https://nodejs.org)

  * Using [Node Version Manager](https://github.com/creationix/nvm)

    ```
    sudo apt-get update
    sudo apt-get install build-essential checkinstall libssl-dev
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
    # close and re-open the terminal
    command -v nvm  # verify a successful installation
    nvm ls  # or nvm ls-remote
    nvm install #.#.#  # install specified version
    nvm alias default node
    ```
  * Using [Node Package Manager](https://docs.npmjs.com/)

  * Using [Binary Packages](https://nodejs.org/en/download/)

  * Using [Homebrew](https://brew.sh/)

    ```
    brew install node
    ```

<a name="install-js-ng"></a>
### Angular CLI

  The [Angular CLI](https://cli.angular.io/) can initialize, develop,
  scaffold and maintain Dockerian JsUi as an [Angular/ng2](https://angular.io/) application.
  Following the best practices, the CLI can create an application right out of the box,
  generate components, routes, services and pipes with simple tests,
  as well as easily serve the app locally while developing.

  ```
  npm install -g @angular/cli

  ng new ngApp && cd ngApp
  npm start  # which runs `ng serve`
  ```
  **Note**:
  - For chrome headless test, configure `karma.conf.js`.
  - The default serve port is `4200`.
    Edit the cli configuration `.angular-cli.json` and
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
### create-react-app for React

  The [create-react-app](https://github.com/facebookincubator/create-react-app)
  cli can initialize a React.js project with [zero-configuration](https://reactjs.org/blog/2016/07/22/create-apps-with-no-configuration.html).

  ```
  npm install -g create-react-app

  create-react-app myReactApp && cd myReactApp
  npm start
  ```
  **Note**:
  - For non-interactive testing, set `test` in npm scripts to `CI=true react-scripts test --env=jsdom`.
  - The default serve port is `3000`.
    Edit/Create configuration file `.env` (under the project root) and
    change/add a customized `PORT` setting:

    ```
    PORT=8080
    ```

  See [package](https://www.npmjs.com/package/create-react-app)
  and [guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)

<a name="install-js-vue"></a>
### Vue CLI

  The [vue-cli](https://github.com/vuejs/vue-cli) can scaffold a Vue.js project.

  ```
  npm install -g vue-cli

  vue init webpack myVueApp && cd myVueApp
  npm start  # which runs `npm run dev` by default
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



<a name="js-frameworks"><br/></a>
## JavaScript Frameworks

  * Angular (ng2) vs ReactJS vs Vue.js
    - https://medium.com/javascript-scene/angular-2-vs-react-the-ultimate-dance-off-60e7dfbc379c
      - steep learning curve
      - dist package size larger than React+Redux
      - coupling and cohesion https://www.youtube.com/watch?v=x7cQ3mrcKaY
      - MVC no longer the best design pattern
      - TypeScript provides the best intellisense but also adds overhead
      - Dependency Injection might not make testing easier
      - Jasmine/Mocha issues
    - https://medium.com/unicorn-supplies/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176
    - https://derickbailey.com/2015/08/26/building-a-component-based-web-ui-with-modern-javascript-frameworks/
    - https://github.com/stickfigure/blog/wiki/Opinionated-Comparison-of-React%2C-Angular2%2C-and-Aurelia
    - https://www.toptal.com/front-end/angular-vs-react-for-web-development

  * Angular
    - https://hackernoon.com/running-karma-tests-with-headless-chrome-inside-docker-ae4aceb06ed3

  * ReactJS
    - repl: https://jscomplete.com/repl/
    - install react detector and developer tools for Chrome/Firefox
    - http://jamesknelson.com/should-i-use-react-createclass-es6-classes-or-stateless-functional-components/
    - http://jamesknelson.com/structuring-react-applications-higher-order-components/
    - https://rohan-paul.github.io/javascript/2017/08/08/Understanding_ReactJS_Component/
    - https://toddmotto.com/react-create-class-versus-component/
    - https://www.w3resource.com/slides/react-style-guide.php
    - https://github.com/moonhighway/learning-react
    - https://github.com/AlexGilleran/jsx-control-statements
    - https://reactarmory.com/guides/learn-react-by-itself
    - https://survivejs.com/
    - https://reactjs.org/docs/hello-world.html
    - https://reactjs.org/tutorial/tutorial.html
    - https://jscomplete.com/learning-react-js
    - https://www.codecademy.com/learn/react-101
    - https://scotch.io/tutorials/learning-react-getting-started-and-concepts
    - https://medium.com/prod-io/react-redux-architecture-part-1-separation-of-concerns-812da3b08b46
    - https://edgecoders.com/so-you-want-to-learn-react-js-a78801d3cd4d
    - https://www.codementor.io/collections/learn-reactjs-bwc6wg9jg
    - https://www.lynda.com/React-js-tutorials/Learn-React-js-Basics/519668-2.html
    - https://edgecoders.com/learning-react-js-is-easier-than-you-think-fbd6dc4d935a
    - https://www.quora.com/Whats-the-best-place-to-learn-React-js
    - https://www.tutorialspoint.com/reactjs/

  * Vue.js
    - https://github.com/vuejs/awesome-vue#projects-using-vuejs
    - http://pixeljets.com/blog/why-we-chose-vuejs-over-react/
    - https://about.gitlab.com/2016/10/20/why-we-chose-vue/
    - https://rlafranchi.github.io/2016/05/03/vue-vs-react/
    - https://vuejs.org/v2/guide/comparison.html
    - https://morningstar.engineering/vue-2-unit-testing-primer-48d1d616a981
    - https://vuejs-tips.github.io/cheatsheet/

  * Vue components
    - https://github.com/brockpetrie/vue-moment
    - http://element.eleme.io/#/en-US
    - http://quasar-framework.org/
    - https://onsen.io/vue/

  * Vuex
    - https://vuejsdevelopers.com/2017/05/15/vue-js-what-is-vuex/


<a name="ui-components"><br/></a>
## UI Component Frameworks

<a name="cssf"></a>
### CSS Frameworks

  * [Bulma](http://bulma.io/)
  * [Bootstrap](http://getbootstrap.com/)
  * [Foundation by Zurb](http://foundation.zurb.com/)
  * [Materialize](http://materializecss.com/)
  * [Pure by Yahoo](http://purecss.io/)
  * [Semantic UI](http://semantic-ui.com/)
  * [Surface](http://mildrenben.github.io/surface)
  * [UIKit](https://getuikit.com/v2/)

  * Flexbox
    - Previous CSS version display: block|inline|inline-block|table;
    - Other layout: grid (in dev), positioned, flex/float/clear, flexbox (IE10)
    - See `display` [properties](https://www.w3schools.com/cssref/pr_class_display.asp)
    - CSS3 display: flex; `/* to replace float */`
    * The `flex` container properties:
      - flex-direction: row|row-reverse|column|column-reverse|initial|inherit;
      - flex-wrap: nowrap|wrap|wrap-reverse|initial|inherit;
      - justify-content: flex-start|flex-end|center|space-between|space-around|initial|inherit;
      - align-content: stretch|center|flex-start|flex-end|space-between|space-around|initial|inherit;
      - align-items: stretch|center|flex-start|flex-end|baseline|initial|inherit;
    * See
      - https://www.w3schools.com/css/css3_flexbox.asp
      - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout
      - https://css-tricks.com/snippets/css/a-guide-to-flexbox/


<a name="js-cf"><br/></a>
### Component Frameworks
  * *All*
    - https://segmentfault.com/a/1190000012365605
    - https://www.sitepoint.com/most-popular-frontend-frameworks-compared/
    - https://superdevresources.com/material-design-web-ui-frameworks/
    - https://blog.bitsrc.io/11-react-component-libraries-you-should-know-178eb1dd6aa4 (react)
    - https://hackernoon.com/the-coolest-react-ui-frameworks-for-your-new-react-app-ad699fffd651 (react)
    - https://hashnode.com/post/10-best-reactjs-ui-frameworks-for-rapid-prototyping-cit49tqx414z89c53equ4zc5k
    - https://ourcodeworld.com/articles/read/497/top-10-best-ui-frameworks-for-reactjs (react)
    - https://blog.bitsrc.io/11-vue-js-component-libraries-you-should-know-in-2018-3d35ad0ae37f (vue)
    - https://github.com/petehouston/vue-ui-framework (vue)
    - https://madewithvuejs.com/frameworks (vue)
  * Chart
    - [D3.js](https://d3js.org/)
    - [Chart.js](http://www.chartjs.org/docs/latest/)
    - [NG2 Chart](https://valor-software.com/ng2-charts) for Angular2
  * Ng (Angular.js)
    - [Anuglar Material](https://material.angular.io/)
    - [Clarity](https://vmware.github.io/clarity/documentation)
    - [NGX Boostrap](https://valor-software.com/ngx-bootstrap/)
    - [Prime NG](https://www.primefaces.org/primeng)
  * [Bootstrap](https://getbootstrap.com/docs) for
    [Angular](https://ng-bootstrap.github.io) |
    [React](https://react-bootstrap.github.io) |
    [vuestrap](http://kzima.github.io/vuestrap-base-components) or
    [Vue](https://bootstrap-vue.js.org/docs/components)
  * [Element UI](http://element.eleme.io/#/en-US/) -
    [ng](https://element-angular.faas.ele.me/guide) |
    [react](https://eleme.github.io/element-react/#/en-US/quick-start) |
    [vue](http://element.eleme.io/#/en-US/component/quickstart)
  * [Fabric](https://developer.microsoft.com/en-us/fabric) for
    [ng](https://developer.microsoft.com/en-us/fabric#/angular-js) [demo](http://ngofficeuifabric.com/) |
    [react](https://developer.microsoft.com/en-us/fabric#/components)
  * [Onsen UI](https://onsen.io/) for
    [ng](https://onsen.io/angular2/) |
    [react](https://onsen.io/react/) |
    [vue](https://onsen.io/vue/)
  * React.js
    - [Amaze UI](http://amazeui.org/react/components/)
    - [Ant Design](https://ant.design/docs/react/introduce)
    - [Blueprint](http://blueprintjs.com/docs/v2/)
    - [Elemental UI](http://elemental-ui.com/)
    - [Grommet](http://grommet.io/)
    - [Material UI - React](http://www.material-ui.com/)
    - [React Toolbox](http://react-toolbox.io/)
    - [React UI](http://lobos.github.io/react-ui)
    - [React Visualized](http://bvaughn.github.io/react-virtualized/#/components/List)
    - [Ring UI](https://jetbrains.org/ring-ui/branch/ring-ui-language/index.html)
    - [UIW](https://uiw-react.github.io/#/en/quick-start)
    - [WeUI](https://weui.github.io/react-weui/docs)
    - [Zan](https://www.youzanyun.com/zanui/zent/en)
  * [Semantic UI](https://semantic-ui.com/) -
    [ng](https://semantic-ui.com/introduction/getting-started.html)
    [react](https://react.semantic-ui.com) |
    [vue](https://semantic-ui-vue.github.io)
  * Vue.js
    - [AT UIKit](https://at-ui.github.io/at-ui/#/en)
    - [Buefy](https://buefy.github.io)
    - [iView](https://www.iviewui.com/)
    - [Keen UI](https://josephuspaye.github.io/Keen-UI)
    - [Mint UI](http://mint-ui.github.io/docs/#/en2)
    - [Muse UI](http://www.muse-ui.org/)
    - [N3 components](https://n3-components.github.io/N3-components/component_en.html)
    - [Office UI Fabric Vue](https://aidewoode.github.io/office-ui-fabric-vue)
    - [Quasar](http://quasar-framework.org/guide/index.html)
    - [Vue Material](https://vuematerial.io/)
    - [Vuetify](https://vuetifyjs.com/vuetify/quick-start)
    - [Weex](https://weex.apache.org/guide/)


<a name="vue-cf"><br/></a>
### Vue.js Components

Notes:
  * The frameworks for mobile apps are not included:
    - [Framework7-vue](https://github.com/framework7io/framework7-vue)
    - [Mint UI](http://mint-ui.github.io/docs/#/en2)
    - [Onsen UI for Vue](https://onsen.io/vue/)
    - [Quasar](http://quasar-framework.org/components/)
    - [Vulma](https://vulma.org)
    - [VUM - Vue Mobile](http://getvum.com/)
    - [Weex](https://weex.apache.org/references/)
  * The frameworks based on [Material Design](https://material.io/) are not fully evaluated:
    - [Keen UI](https://josephuspaye.github.io/Keen-UI)
    - [Muse UI](http://www.muse-ui.org/#/layout)
    - [Vue Material](https://vuematerial.io/components/app) (has more advanced features)
    - [Vue MDL](https://posva.net/vue-mdl-docs)
    - [Vuetify](https://vuetifyjs.com/en)
  * Some good ones but on other emphasis:
    - [Eureka](https://github.com/eteplus/eureka) - A blog framework
    - [Eagle.js](https://github.com/zulko/eagle.js/) - A slideshow framework
    - [Fish UI](https://myliang.github.io/fish-ui/#/components/index)
    - [Framevuerk](http://framevuerk.com/installation=setup)
    - [N3 components](https://n3-components.github.io/N3-components/component_en.html)
    - [Semantic UI Vue](https://semantic-ui-vue.github.io)
    - [Vue-Blu](https://chenz24.github.io/vue-blu/#/en)
    - and [more](https://github.com/vuejs/awesome-vue)
  * This side-by-side comparison mainly focus on feature-rich form-input and data-table components.
    - A `[x]` indicates fully-implemented feature
    - A `[-]` indicates partially-implemented feature
    - A blank indicates the feature does not exist

| Features            | AT UIKit | BV  | Buefy | Element | iView | Vuetify |
|:--------------------|:--------:|:---:|:-----:|:-------:|:-----:|:-------:|
| npm                 | at-ui/ui-style | bootstrap-vue | buefy | element-ui| iview | vuetify |
| i18n                | en, zh-CN, ... | | | en, zh-CN | en, zh-CN |       |
| environment/theme   |[Electron](http://electron.atom.io/)/[NW.js](http://nwjs.io/)|||cli|cli|[x]|
| design/layout       | Flexbox  |     |[Bulma](https://bulma.io/documentation/layout/container/)|[x]|[x]|[MD](https://material.io/)|
| grid system         | 24       | 12  | 12    | 24      | 24    | 12      |
| built-in icons      |[Feather](https://at-ui.github.io/at-ui/#/en/docs/icon)||[x]|[x]||?|
| menu/dropdown       |  [x]     | [-] |  [x]  |  [x]    |  [x]  |  [x]    |
| collapse            |  [x]     | [x] |       |  [x]    |  [x]  |         |
| tree/toggle levels  |          |     |       |  [x]    |  [x]  |         |
| steps               |  [x]     |     |       |  [x]    |  [x]  |  [x]    |
| timeline            |  [x]     |     |       |         |  [x]  |         |
| progress bar        |  [x]     | [x] |       |  [x]    |  [x]  |  [x]    |
| progress circle     |          |     |       |  [x]    |  [x]  |  [x]    |
| pagination          |          | [x] |  [x]  |  [x]    |  [x]  |  [x]    |
| dialog/modal        |  [x]     | [x] |  [x]  |  [x]    |  [x]  |  [x]    |
| avatar              |          |     |       |         |  [x]  |  [x]    |
| badge               |  [x]     | [-] |       |  [x]    |  [x]  |  [x]    |
| alert/message/bubble|  [x]     | [x] |  [x]  |  [x]    |  [x]  |  [x]    |
| transfer list       |          |     |       |  [x]    |       |         |
| closable tag        |  [x]     |     |  [x]  |  [x]    |  [x]  | [chip](https://vuetifyjs.com/en/components/chips) |
| switch button       |  [x]     |     |  [x]  |  [x]    |  [x]  |  [x]    |
| slider              |  [x]     |     |       |  [x]    |  [x]  |  [x]    |
| radio button group  |  [x]     | [x] |  [x]  |  [x]    |  [x]  |         |
| popover             |  [x]     | [x] |       |  [x]    |  [x]  |         |
| upload file         |          | [x] |  [x]  |  [x]    |  [x]  |         |
| auto**complete**    |          | [x] |  [x]  |  [x]    |  [x]  |         |
| rating (5-star)     |  [x]     |     |       |  [x]    |  [x]  |         |
| input:icon          |  [x]     |     |  [x]  |  [x]    |       |         |
| input:state         |  [x]     | [x] |  [x]  |         |       |         |
| input:clearable     |          | [x] |       |  [x]    |  [x]  |         |
| input:number        |  [x]     | [x] |       |  [x]    |       |         |
| input:date picker   |          | [-] |  [x]  |  [x]    |  [x]  |  [x]    |
| input:time picker   |          | [-] |  [x]  |  [x]    |  [x]  |  [x]    |
| input:passwd reveal |          | [x] |       |         |       |  [x]    |
| input:validation    |          | [x] |       |  [x]    |       |  [x]    |
| textarea:resizable  |  [x]     | [x] |       |  [x]    |  [x]  |  [x]    |
| table:pagination    |  [x]     |     |  [x]  | *slot*  |  [x]  |  [x]    |
| table:sortabe       |  [x]     | [x] |  [x]  |  [x]    |  [x]  |  [x]    |
| table:filter/search |          | [x] |       |  [x]    |  [x]  |  [x]    |
| table:fixed headers |          |     |       |  [x]    |  [x]  |         |
| table:fixed columns |          |     |       |  [x]    |  [x]  |         |
| table:responsive    |          | [x] |  [x]  |         |       |         |
| table:detailed row  |          | [x] |  [x]  |  [x]    |  [x]  |  [x]    |
| table:data export   |          |     |       |         |  [x]  |         |
| tab:badge/icon      |  [x]     |     |  [x]  |  [x]    |  [x]  |  [x]    |
| tab:closable        |  [x]     |     |       |  [x]    |  [x]  |  &nbsp; |


<a name="vue-cf-tables"><br/></a>
#### Comparison - Table components

Summary (stars/forks - by 2018-03-27)
  * [el-table](http://element.eleme.io/#/en-US/component/table)
  * [vue-table-2](https://github.com/ratiw/vuetable-2) (993/190)
    - status: v1.7.3 - 2018-02-01
    - [demo](http://jsfiddle.net/CristiJ/z11fe07p/1318/)
    - [sample](https://github.com/ratiw/vuetable-2-with-laravel-5.4) | [tutorial](https://github.com/ratiw/vuetable-2-tutorial/wiki)
    - features:
      - callback [formatter](https://ratiw.github.io/vuetable-2/#/Callbacks)
      - detail view, row identifier, pagination, etc.
      - field options: name, sortField, title, titleClass, dataClass, callback, visible, width
      - fields (`columns`) allow name for [nested data](https://ratiw.github.io/vuetable-2/#/Fields-Definition?id=nested-json-data): e.g. `address.city`
      - special fields: `__checkbox`, `__component`, `__handle`, `__sequence`, `__slot`
      - data [transform](https://ratiw.github.io/vuetable-2/#/Data-Transformation)
      - server-side [sorting](https://ratiw.github.io/vuetable-2/#/Sorting)
      - see [data format](https://ratiw.github.io/vuetable-2/#/Data-Format-JSON)
    - [doc](https://ratiw.github.io/vuetable-2)
  * [vue-tables-2](https://github.com/matfish2/vue-tables-2) (641/145)
    - status: last commit on 2018-03-19
    - [demo](https://jsfiddle.net/matfish2/jfa5t4sm/) | [server](https://jsfiddle.net/matfish2/js4bmdbL/)
    - special features:
      - [server side](https://github.com/matfish2/vue-tables-2#server-side):
        - using `<v-server-table url=""` to get `{data, count}`
        - custom request
      - slots and custom slots
      - other [options](https://github.com/matfish2/vue-tables-2#options):
        - responsive property `columnsDisplay`
        - multi sorting
        - debounce
  * [vue2-datatable-component](https://github.com/OneWayTech/vue2-datatable) (366/79)
    - [demo](https://onewaytech.github.io/vue2-datatable/examples/dist)
    - [doc](https://onewaytech.github.io/vue2-datatable/doc/#/en/)
    - special features:
      - fixed headers and scrolling columns
  * [vue-data-tables](https://github.com/njleonzhang/vue-data-tables/) (587/112)
    - status: last commit on 2018-03-05
    - [demo](http://jsfiddle.net/zpczjl/9tp3z4bn/) | [sever-end](http://jsfiddle.net/zpczjl/9tp3z4bn/)
    - [doc](https://njleonzhang.github.io/vue-data-tables/#/?id=vue-data-tables)
    - special features:
      - auto/free mode for [server data](https://njleonzhang.github.io/vue-data-tables/#/serverData)
      - table slot "append": for infinite scroll (clustering/lazy-loading)
      - checkbox/search-box filter and custom filter function
      - action and custom action
  * [vue-datasource](https://github.com/coderdiaz/vue-datasource) (359/85)
    - status: last major change on 2017-10-30
  * [vuetiful](https://github.com/andrewcourtice/vuetiful) (348/72)
    - status: discontinued; last commit: 2017-11-08
    - a.k.a. Advanced Datatable Component (Vuejs editable grid)
    - special features:
      - filtering
      - real-time editing
      - multi-column grouping
      - custom filter/formatter
      - custom aggregation functions
      - custom templates
    - [demo](https://codepen.io/andrewcourtice/full/woQzpa/)
    - [doc](https://github.com/andrewcourtice/vuetiful/tree/master/src/components/datatable)

Resources:
  - https://vuejsexamples.com/tag/table/
  - https://www.thetechieshouse.com/best-10-vue-js-tables-and-data-grid-examples/
  - https://vuejsfeed.com/blog/comparison-of-datatable-solutions-for-vue-js
  - https://medium.mybridge.co/30-amazing-vue-js-open-source-projects-for-the-past-year-v-2018-d39a0d019bb7
  - https://alligator.io/vuejs/roundup-desktop-components/



<a name="js-lang"><br/></a>
## JavaScript Language

<a name="es5"><br/></a>
### ES5

  * JavaScript variable
    - both `var` and `function` definitions (declarations) will be hoisted
      so that it could be override by later assignment
    - unless `var` definition is also with assignment (rather than, e.g. just
      one line of `var a` without assigned value), the `var a` will be
      override by the same name of `function a() {}`.
    - any variable name without definition nor assignment will thru 'not defined' ReferenceError

  * JavaScript class
    - A `function ClassName() {}` is an object, and a class constructor;
    - *ClassName*`.constructor` points to `Function`;
    - *ClassName*`.__proto__` points to `Function.prototype`;
    - Only class constructor has `prototype`, which is a (non-Function) object;
    - *ClassName*`.prototype.constructor` points to *ClassName* itself;
    - *ClassName*`.prototype.__proto__` points to `Object.prototype` (by default)
    - *ClassName* instance`.__proto__` points to *ClassName*, the constructor
    - Do NOT use `__proto__` directly
    - see some [examples](./JSF.js)

  * JavaScript OOP design patterns (in use of function)
    1. class pattern:
        - use `function` as a constructor object
        - use `function` definition with a Carmel-case-style `ClassName`
        - any object has a built-in object `prototype`, same as a constructor
        - the constructor should never be used as a function to call
        - use on instances with need of sharing methods and properties
        - use `new` with `ClassName` to init `this` as a blank object `{}`
        - use `this` as instance to create public properties (inside constructor)
        - use *ClassName*`.prototype` to add any public method
        - use *ClassName*`.prototype.constructor` as the constructor itself
        - do NOT return anything inside the constructor
        - do NOT (need to) assign class constructor to a variable [to prevent hoisting]
        - do NOT use `this` inside constructor to create any public method
        - do NOT assign/overwrite *ClassName*`.prototype`
    2. module pattern:
        - use `function` as a function object
        - use function name, e.g. `myFunc` starting with lower case
        - use closure and return constructed object in definition body
        - use on instances WITHOUT need of sharing methods and properties
        - do NOT use `myFunc.prototype`
        - do NOT use `this` in function definition body
        - do NOT use `new` with function object

  * JavaScript `this` scope
    - only class pattern creates a new scope and `this`
    - object literal is same as constructing a new object with class pattern
    - arrow function preserves lexical scope `this`
    - binding precedence for `this`:
      - as a `function` called with `new`, `this` is the newly constructed object
      - explicit binding `fn.call(obj)`, `this` is the explicitly specified `obj`
      - implicit binding `obj.fn()`, this is the context `obj` as containing or owning object
      - default binding: `undefined` in `use strict` mode; otherwise, global
      - ignoring `this` by `null` binding: e.g. `fn.apply(null, args)`

<a name="es6"><br/></a>
### ES6

  * New features (ES2015/ES6)
    - map and reduce array
    - closures and callbacks
    - new features of the object literal and template strings
    - block scopes and let/const vs var (hoisting)
    - arrow functions
      - https://medium.com/@reasoncode/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4
      - https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc
      - https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript
      - arrow function and scope

        ```
        var foo = 'global'
        const obj = {
          foo: 'instance',
          bar: function (delay=100) { // new scope vs arrow function: `(delay) => {}`
            console.log(`bar function: ${this.foo}`)
            setTimeout(function () { // global scope ?
              let foo = 'nested'
              console.log(`bar setTimeout: ${this.foo}`)
              }, delay)
          }
        }
        ```
    - default parameter
    - destructuring and object literal enhancement (restructing)
    - spread operator
      - https://davidwalsh.name/spread-operator
      - https://namitamalik.github.io/Spread-and-Rest-Operator-in-ES6/
      - https://ponyfoo.com/articles/es6-spread-and-butter-in-depth
    - classes and inheritance (used slightly in defining component, but to be avoided otherwise)
    - class field syntax to define methods with arrow functions
    - export, export default, and import/require modules (most important of all)
    - promise objects and and how to use them with async/await

  * export/import

|export (in lib.js)|import|notes|
|:-----------------|:-----|:----|
|`export function f1() {}`<br/>`export function f2() {}`|`import {f1, f2} from 'lib'`|multiple|
|`export {f1, f2}`|`import {f1, f2} from 'lib'`|selective|
|`export {f1, f2 as fn2}`|`import * from 'lib'`<br/>`import * as utils from 'lib'`|all with module name|
|`export default utils`|`import utils from 'lib'`|default module name (recommended)|
|`export {f1 as default, f2}`|`import {lib, f2} from 'lib'`|mixed|

  See spec for
  [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) and [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  and [examples](http://2ality.com/2014/09/es6-modules-final.html)

  * deep/shallow copy
    - `Object.assign` only copies property values and reference if the property is an object.
    - Use `cloneDeep` (from `lodash`) or the following function to perform deep copy.

      ```
      deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
      ```


<a name="study-notes"><br/></a>
## Study Notes

<a name="async"><br/></a>
### async/await vs promise

  * history: callback -> promise -> generator -> async/await
  * promise version

    ```
    var fs = require('fs')
    var readFile = function (fileName){
      return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
          if (error) reject(error)
          else resolve(data)
        })
      })
    }
    ```
  * generator version

    ```
    var gen = function* (){
      var f1 = yield readFile('/etc/fstab')
      var f2 = yield readFile('/etc/shells')
      console.log(f1.toString())
      console.log(f2.toString())
    }
    ```
  * async/await

    ```
    var asyncReadFile = async function (){
      var f1 = await readFile('/etc/fstab')
      var f2 = await readFile('/etc/shells')
      console.log(f1.toString())
      console.log(f2.toString())
    }
    ```
  * catching reject

    ```
    async function fn() {
      try {
        await aFuncReturnsPromise();
      } catch (err) {
        console.log(err)
      }
    }
    ```
    Alternatively

    ```
    async function asyncFn() {
      await aFuncReturnsPromise().catch(function (err){
        console.log(err)
      })
    }
    ```
  * forEach vs for

    ```
    async function dbFuc(db) {
      let data = [{}, {}, {}] // some data
      // key `async` is required to use with `await`
      data.forEach(async function (req) {
        await db.post(req) // concurrent calls
      })
    }
    ```
    use `Promise.all` instead

    ```
    async function dbFuc(db) {
      let data = [{}, {}, {}] // some data
      let promises = data.map((req) => db.post(req))
      let results = await Promise.all(promises)
      return results
    }
    ```
    Alternatively,

    ```
    async function dbFuc(db) {
      let data = [{}, {}, {}] // some data
      let promises = data.map((req) => db.post(req));
      let results = []
      promises.forEach((promise) => {
        results.push(await promise);
      }
      return results
    }
    ```
    Otherwise, without concurrency

    ```
    async function dbFuc(db) {
      let data = [{}, {}, {}] // some data
      for (let req of data) {
        await db.post(req);
      }
    }
    ```

<a name="debug"><br/></a>
### debugging

  - new [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) statement
  - debugging [tips](https://raygun.com/javascript-debugging-tips)


<a name="functional-programming"><br/></a>
### Functional programming

  - Immutable state
  - Functions as first class citizens
  - Functions with no side-effects
  - Higher-order functions


<a name="flux"><br/></a>
### Flux (design pattern)

  - pattern: action -> dispatcher -> store -> view
    - Single Source of Truth
    - Data is Read-Only
    - Mutations are Synchronous
  - Redux
    - The state of your whole application is stored in an object tree within a single store.
    - The only way to change the state is to emit an action, an object describing what happened.
    - To specify how the state tree is transformed by actions, you write pure reducers.
  - Vuex
    - Single Source of Truth policy, where there should only be one store. - Data Tracking
    - Data from the store is read-only on the component, and must be changed through special processes that vuex calls “mutations” - Functional Programming
    - Finally, these mutations that are performed should be synchronous. - Ensuring Persistence.


<a name="react-patterns"><br/></a>
### React Patterns

|Pattern      | Usage |Example|
|:------------|:-----:|:------|
|createClass  |deprecated|<code>var MyComp = React.createClass({<br/>&nbsp;&nbsp;render: function(){<br/>&nbsp;&nbsp;&nbsp;return (&lt;div&gt;{this.props.name}&lt;/div&gt;);<br/>&nbsp;&nbsp;}<br/>&nbsp;});</code>
|ES6 class    |with `this`|<code>class MyComp extends React.Component {<br/>&nbsp;&nbsp;constructor(props) {super(props);}<br/>&nbsp;&nbsp;render() {<br/>&nbsp;&nbsp;&nbsp;return (<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;{this.props.name}&lt;/div&gt;<br/>&nbsp;&nbsp;&nbsp;);<br/>&nbsp;&nbsp;}<br/>&nbsp;}</code>|
|createElement|w/o JSX|<code>const MyElem = (props) => <br/>&nbsp;&nbsp;React.createElement(<br/>&nbsp;&nbsp;&nbsp;'div', null, \`{props.name}\`<br/>&nbsp;&nbsp;)<br/>&nbsp;const MyComp = React.createFactory(MyElem)</code>|
|Stateless    |with JSX|<code>const MyComp = (props) => (<br/>&nbsp;&nbsp;&lt;div&gt;{props.name}&lt;/div&gt;<br/>&nbsp;)<br/>&nbsp;const MyComponent = (props) => {<br/>&nbsp;&nbsp;let v = props.version + ".0";<br/>&nbsp;&nbsp;return (<br/>&nbsp;&nbsp;&nbsp;&lt;div&gt;{props.name} {v}&lt;/div&gt;<br/>&nbsp;&nbsp;)<br/>&nbsp;)</code>|

  **Note**:
  - Always use stateless function unless you need to use react's life cycle methods, refs or state.


<a name="vuejs"><br/></a>
### Vue.js

  * directives
    - `v-on` (`@`) events:
      - `click` (with modifier: `stop`, `prevent`, `self`, `one`)
      - `keyup` (with modifier: `enter`, `space`, `delete`, `esc`, `left`)
    - `v-model` (two-way binding)
      - syntax: `v-model="dataProp"`
      - shorthand for `:value="dataProp" @input="dataProp = $event.target.value"`
      - only works with `<input/>`, `<select/>`, `<textarea/>`
    - `v-bind`(`:`) `v-bind:attribute="expression"` only for element attributes
    - `v-if` and `v-show` (setting `display:none` on false)
    - `v-for`
    - `v-html`: `<span v-html="htmlStringVariable" />` rendering content as html
    - `v-once`: one-time interpolations that do not update on data change

  * class and style
    - `:class="{ className: dataProp }"` eval to `dataProp ? 'className' : ''`
    - `:class="o"` eval to `Object.keys(o).reduce((s, v) => o[v] ? s+' '+v : s)`
    - `:class="[a, b]"` map to values of `a` and `b` in data properties
    - `:style="{color: dataProp}"` eval to `style="color:dataPropValue"`
    - `:style="[styleObj1 styleObj2]"` combines style objects

  * data vs props
    - parent component defines `propName` key in `data`
    - child component defines `'myPropName'` in `props` list
    - parent component template uses `v-bind:myPropName="propName"` to pass down `propName` value
    - child component template uses `{{myPropName}}`
    - primitive value can be passed but cannot be changed
    - complex value cannot be reassigned but can be modified (NOT recommended)
    -

  * life-cycle
    - beforeCreate/created
    - beforeMount/mounted
    - beforeUpdate/updated
    - beforeDestroy/destroyed
    - errorCaptured

  * computed vs method vs watch:
    - `computed` properties are cached based on the dependencies
      and will be updated whenever the dependencies change
    - `method` functions always run whenever re-rendering

    ```
    computed: {
      propName: {
        get: function() {
          return this.propFoo + this.propBar
        }
        set: function(value) {
          var [v1, v2] = value.split(' ')
          this.propFoo = v1
        }
      }
    }
    ```

  * vuex
    - Vuex object

      ```
      {
        Store: function Store(){},
        mapActions: function(){}, // mapping to actions
        mapGetters: function(){}, // mapping to getters
        mapMutations: function(){}, mapping to mutations
        mapState: function(){}, // mapping to state
        install: function install(){},
        installed: true
      }
      ```
    - state:
    - getters: for getting state, as `computed` for `data`
    - mutations: the only way to change state, must be synchronous

      ```
      this.$store.commit('MUTATION', {amount: 10})
      // or
      this.$store.commit({type: 'MUTATION', amount: 10})
      ```

    - actions: to dispatch/commit mutations, can be async
    - modules:
    - enable `this.$store` in component by `new Vue({store, ...})`
    - binding event:
      1. using v-model `<input :value="message" @input="onInput">`

        ```
        computed: {
          ...mapState(['message'])
        },
        methods: {
          onInput (e) {
            this.$store.commit('message', e.target.value)
          }
        ```
      2. using getter/setter for `<input v-model="message">`

        ```
        computed: {
          message: {
            get () {
              return this.$store.state.obj.message
            },
            set (value) {
              this.$store.commit('updateMessage', value)
            }
          }
        }
        ```



<a name="others"><br/></a>
## Others

  * Books/Resources
    - JavaScript
      - http://freefrontend.com/javascript-books/
      - http://exploringjs.com/es2016-es2017.html
      - https://leanpub.com/understandinges6/read/
      - https://ponyfoo.com/books/practical-modern-javascript/chapters#toc
      - https://github.com/getify/You-Dont-Know-JS
    - HTML and CSS
      - http://adamschwartz.co/magic-of-css/
      - https://cssguidelin.es/
      - https://www.gitbook.com/book/frontendmasters/front-end-handbook-2017/details
      - https://learn.shayhowe.com/html-css/
      - http://marksheet.io/
    - Node.js
      - https://leanpub.com/nodejsbasics
      - https://leanpub.com/thenodejsclustermodule
      - https://www.sitepoint.com/node-js-best-practices-from-the-node-gurus/
      - https://www.syncfusion.com/ebooks/keystonejs_succinctly
    - Angular.js
      - https://leanpub.com/developing-with-angular
    - React.js
      - [Awesome React](https://github.com/enaqx/awesome-react)
      - [Fullstack React](https://www.fullstackreact.com/)
      - [Learning React: Functional Web Development with React and Redux](https://github.com/moonhighway/learning-react)
      - [React in Action](https://www.manning.com/books/react-in-action)
      - [React Quickly](https://www.manning.com/books/react-quickly)
      - [ReactJS Succinctly by Samer Buna](https://www.syncfusion.com/ebooks/reactjs_succinctly)
      - [The Road to Learn React](https://roadtoreact.com/)
      - [React for the Visual Learner](https://leanpub.com/reactjsforthevisuallearner/)
      - [UI and React](https://leanpub.com/ui-react)
      - [A quick learning path summary](https://medium.com/front-end-hacking/my-path-until-now-into-react-a-learning-path-5d0303b7ffc1)
        - [Beginer's Guide](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)
        - [React Enlightenment](https://www.reactenlightenment.com/)
        - [React Patterns](https://reactpatterns.com/)
        - [React.js at Medium](https://medium.com/tag/reactjs)
        - [React Holiday](https://react.holiday/)
      - [more](http://freefrontend.com/reactjs-books/)
    - Vue.js
      - [Awesome Vue.js](https://github.com/vuejs/awesome-vue)
      - [Packt - Learning Vue.js 2](https://github.com/PacktPublishing/Learning-Vuejs-2)
      - [Laracosts course: Learn Vue.js step by step](https://laracasts.com/series/learn-vue-2-step-by-step)
      - [The Complete Vue.js Guide](https://www.udemy.com/vuejs-2-the-complete-guide/)
      - [Vue.js Guide](https://vuejs.org/v2/guide/)

  * Online Editors
    - [Codepen](https://codepen.io/)
    - [CodeSandbox](https://codesandbox.io/)
    - [JS.do - Online JavaScript Editor](https://js.do/)
    - [JSBin - Collaborative JavaScript Debugging](https://jsbin.com)
    - [JSFiddle](https://jsfiddle.net)
    - [Refiddle](http://refiddle.com/)
    - [Stackblitz - Online VS Code IDE for Angular & React](https://stackblitz.com/)
    - [Vueditor - WYSIWYG Editor For Vue.js](http://www.vuescript.com/wysiwyg-editor-vue-js-vueditor/)
    - [VueJS Editor](https://www.tutorialspoint.com/online_vuejs_editor.php)
    - [more ...](http://blog.liveedu.tv/10-best-online-javascript-editors/)

  * LoopBack vs Express (https://da-14.com/blog/why-loopback-better-expressjs)

  * Java Spring
    - https://www.daedtech.com/a-tale-of-two-web-stacks-java-vs-net/
    - https://spring.io/blog/2015/02/11/java-doesn-t-suck-rockin-the-jvm

  * React with Redux
    - https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44
    - https://egghead.io/courses/building-react-applications-with-idiomatic-redux
    - https://egghead.io/courses/getting-started-with-redux

  * TypeScript
    - https://stackify.com/typescript-vs-javascript-migrate/
    - https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript
    - playground: http://www.typescriptlang.org/Playground/
    - alternatives:
      - [Facebook Flow](https://flow.org/en/docs)
      - [Google Closure](https://developers.google.com/closure/compiler/)
      - [Scala](http://www.scala-js.org/)

  * Webpack
    - https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
    - https://blog.envylabs.com/getting-started-with-webpack-2-ed2b86c68783
    - https://survivejs.com/webpack/foreword/
