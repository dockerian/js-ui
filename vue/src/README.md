<img src="assets/vue.png" height="128px" align="right"
  style="border:0;height:128px;text-align:right;vertical-align:middle;"
  alt="Vue.js" border="0" title="Vue.js" valign="middle" />
# Design in Vue.js

> Dockerian JsUi Vue.js - designer's notes

See [User Guide](../static/README.md)

<br/><a name="contents"></a>
## Contents

  * [Layout](#ui)
    - [Directory structure](#tree)
    - [Configuration and settings](#config)
    - [Components structures](#ui-layout)
  * [Components](#components)
    - [Header component](#header)
    - [AppInfo component](#appInfo)
    - [Demo tabs](#tab)
  * [Event mechanism](#events)
  * [Store](#store)


<a name="ui"><br/></a>
## JsUi Vue UI Layout

<a name="tree"><br/></a>
### Directory structure

  ```
  vue/src
  ├── App.vue
  ├── api
  │   └── docs.js
  ├── assets
  │   └── logo.png
  ├── components
  │   ├── About.vue
  │   ├── ...
  │   ├── Main.vue
  │   ├── app (main and shared components)
  │   │   ├── ...
  │   │   ├── AppMenu.vue
  │   │   └── WS.vue
  │   └── demo
  │       ├── HelloWorld.vue
  │       └── ...
  ├── config.js (application configuration and settings)
  ├── helper (view model state and helper functions)
  ├── main.js
  ├── router
  │   ├── appMenu.js (application menu configuration)
  │   └── index.js
  ├── store
  │   ├── actions.js
  │   ├── appInfo
  │   │   ├── ...
  │   │   └── index.js
  │   ├── getters.js
  │   ├── index.js
  │   ├── mutations.js
  │   └── state.js
  └── utils
      └── ...
  ```

<a name="config"><br/></a>
### Configuration and settings

  This project uses data-driven design to prototype interfaces from
  package/application configuration, settings, customized data to vuex store
  and UI components.
  * build [configuration](./build) - [webpack](https://webpack.js.org/concepts/)
  * environment [config](./config) for webpack [template](http://vuejs-templates.github.io/webpack/structure.html)
  * application [config](./src/config.js) and settings - aggregated from all sources
  * application [router](./src/router/index.js) config
  * application [menu configuration](./src/router/appMenu.js)
  * config for misc tools (e.g. eslint)
  * npm [package configuration](./package.json)

For example, the application [config](./src/config.js) includes
  - aggregated build and env settings
  - basic project version and description (from [package.json](./package.json))
  - project information (name, manager, api, and etc.)
  - application data (e.g. valid state constants)

And the menu configuration is mapping to the route names and paths.
  - `router` is using routes from `@/router/appRoutes`
  - `appMenu` is building menu items inherit `name` and `query` from routes
  - `appPerspectives` is based on `appMenu.perspectives.menuItems`

Here is the project structure for config and settings.

  ```
  vue
  ├── build
  │   ├── webpack.base.conf.js
  │   ├── webpack.prod.conf.js
  │   └── webpack.dev.conf.js
  ├── config
  │   ├── index.js
  │   ├── dev.env.js (requiring on 'config/prod.env.js')
  │   ├── prod.env.js
  │   └── test.env.js (requiring on 'config/dev.env.js')
  ├── src
  │   ├── config.js
  │   ├── helper (bridging between models and views)
  │   ├── router
  │   │   ├── appMenu.js (mapping to routes config)
  │   │   ├── appPerspectives.js (multi-tab view config)
  │   │   ├── appRoutes.js (routes config)
  │   │   └── index.js
  │   └── ...
  ├── .babelrc
  ├── .editorconfig
  ├── .eslintrc*
  └── package.json
  ```

<a name="ui-layout"><br/></a>
### Components structures

  * Header
    - Navigation menu button
    - Navigation menu pop-down
    - User gravatar
  * Main / Workspace
    - Sidebar (optional)
    - Demo tabs
  * Footer
    - Copyright/team info
    - Notification (optional/slide-up) | show/hide handler button
    - Clock/Version info



<a name="components"><br/></a>
## Components

<a name="header"></a>
### Header component

  * data:
    - menuDown
    - signedIn
  * computed properties:
    - user
  * methods:
    - openTab
    - toggleMenu
    - signOff

<a name="appInfo"><br/></a>
### AppInfo component

  The AppInfo Notification Message Center includes:
  - size (of the messages container)
  - a list of messages (in order of date/time stamps)
  - counts of messages
  - counts of not-Acknowledged messages
  - counts of error messages


  Message object:
  * uuid
  * message
  * date/time stamp
  * attributes
    - successful (info message)
    - important/sticky (very few message, e.g. "Who logged in on what time", will stay in the message center thru the whole user session)
    - notAcknowledged (such message must be "Acknowledged" before cleared out of the message center)
    - otherwise, a message will be out of the container after certain time or be cleared by user.
  * type

    ```
    debug: "Log",           // debugging message (gray)
    info:  "Informational", // generic or successful message (skyblue or green)
    warn:  "Warning",       // caution or warning (orange/yellow)
    error: "Error",         // error or failure (red)
    fatal: "Fatal",         // system failure
    ```

<a name="appInfo"><br/></a>
### Workspace component

  * data
    - tabs
  * events
    * add-tabs
      - used by `v-on` for `workspace`
      - emitted by menu or from other tabs
      - parameters: name, params
  * methods:
    - addTab
    - removeTab

<a name="tab"><br/></a>
### Demo tabs component

  * data:
    - name
    - description (optional)
    - disabled: `{Boolean}`
    - hidden: `{Boolean}`
  * computed properties:
    - badge
  * methods:
    - closeTab




<a name="events"><br/></a>
## Vue event mechanism

  Vue provides a few ways for communication among components.

  * Global Event Bus
    - register event bus in `main.js`

      ```
      Vue.prototype.$eventBus = new Vue() // Global event bus
      ```
      so that any component can emit or receive events.

    - optionally, register event bus in a helper module, e.g. `helper/vm.js`

      ```
      export const EventBus = new Vue() // need to import from each individual component
      ```

    - export event names. For example, in `helper/vm.js`:

      ```
      export const EVENT_DATA_SYNC = 'dataSync'
      ```
    - emit the event in component: `this.$eventBus.$emit(EVENT_DATA_SYNC)`
    - subscribe event any component:

      ```
      methods: {
        onUpdateAll: function () {
          // updating on data sync event
        }
      },
      unmounted: function () {
        this.$eventBus.$off(EVENT_DATA_SYNC, this.onUpdateAll)
      },
      mounted: function () {
        this.$eventBus.$on(EVENT_DATA_SYNC, this.onUpdateAll)
      }
      ```

  * Passing (read-only) `props` to child components.

  * Passing event to child component(s) so that the child component can emit
    parent's event handler.

    ```
    <!-- in parent component template -->
    <v-child-component v-on:passing-event="eventHandler" />
    ```
    and in child component method:

    ```
    this.$emit('passingEvent', params)
    ```

  * Using Vuex store.


<a name="store"><br/></a>
## Vuex store

  * appInfo state: TBD
