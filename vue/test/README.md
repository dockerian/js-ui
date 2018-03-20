# Vue.js Testing

> Dockerian JsUi Vue.js Testing

<br/><a name="contents"></a>
## Contents

  - [unit testing](#unit)
    - [testing component with vuex store](#component-with-store)
    - [testing vuex actions](#vuex-actions)
    - [more about axios](#axios)
  - [coverage report](#coverage)
  - [e2e testing](#e2e)


<a name="unit"><br/></a>
## Unit Testing

<a name="component-with-store"><br/></a>
## Testing component with Vuex store

  Any vue component with Vuex store can be tested
  by utilizing [vue-test-utils](https://vue-test-utils.vuejs.org/en/guides/using-with-vuex.html).
  See [API](https://vue-test-utils.vuejs.org/en/api/).

  Here is an example.

  ```
  import Vuex from 'vuex'
  import * as vt from 'vue-test-utils'
  import Foo from '@/components/Foo'
  import store from '@/store'

  const localVue = vt.createLocalVue()
  localVue.use(Vuex)

  describe('Foo.vue', () => {
    it('should render correct contents', () => {
      const wrapper = vt.shallow(Footer, {store, localVue})
      const el = wrapper.find('#idSelector')
      console.log(el.text())
    })
  })
  ```

  References
  - https://vue-test-utils.vuejs.org/en/
  - https://eddyerburgh.me/unit-test-vue-components-beginners
  - https://vue-test-utils.vuejs.org/en/guides/using-with-vuex.html
  - https://medium.freecodecamp.org/simple-unit-tests-with-vue-test-utils-and-jest-c384d7abc321
  - https://eddyerburgh.me/mock-vuex-in-vue-unit-tests


<a name="vuex-actions"><br/></a>
### Testing Vuex actions

  Install the packages:

  ```
  npm install axios-mock-adapter --save-dev
  npm install inject-loader --save-dev
  ```

  With `testAction` in [helper](unit/specs/_helper.js) and mock adapter:

  ```
  // test/unit/specs/_api.js
  import axios from 'axios'
  const MockAdapter = require('axios-mock-adapter')
  const mock = new MockAdapter(axios)
  mock.onGet('project/1').reply(200, {
    data: { project: {id:1, name: 'test1'} }
  })
  ```
  In order to test the following api and action (in `/src`):

  ```
  // api/index.js
  import axios from 'axios'
  export const getProject = (pid) => {
    return axios.get(`project/${pid}`)
  }

  // store/modules/project/actions.js
  import * as api from '@/api'
  export default {
    setProject ({commit}, pid) {
      api.getProject (PID) // This has to change.
        .then((res) => {
          commit('SET_PROJECT', res.data.project)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
  ```
  For api testing, it is required to set `jest-environment` to `node` by
  using [docblock](https://facebook.github.io/jest/docs/en/configuration.html#testenvironment-string)
  as the first `/**/` comment block at the very top of the test file.
  Here are the test spec:

  ```
  /**
   * @jest-environment node
   */
  // test/unit/specs/actions.spec.js
  import { testAction } from './_helper'
  import axios from 'axios'
  // mock adapter
  require('./_api')
  // inject actions
  const actionsInjector = require('inject-loader!@/store/modules/project/actions')
  const actions = actionsInjector({
    '@/api': {
      getProject () {
        return axios.get(`project/1`)
      }
    }
  })
  // test cases
  describe('actions', () => {
    it('setProject', (done) => {
      testAction(actions.default.setProject, null, {}, [
        {
          type: 'SET_PROJECT',
          payload: {
            data: { project: {id:1, name: 'test1'} }
          }
        }
      ], done)
    })
  })
  ```

&raquo; See
  - [Jest](https://facebook.github.io/jest/)
  - [Jest for all](https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186)
  - [Some examples](https://www.drydenwilliams.co.uk/code/2017/06/03/unit-testing-in-vuejs/)
  - [Testing Vue.js](https://leanpub.com/testingvuejscomponentswithjest) book
  - [Unit Testing Vue.js components](https://medium.com/@kevin_peters/unit-testing-vue-js-components-with-jest-86e14ef499da)
  - [Unit Testing with Jest mocks](https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255)
  - [Unit Testing Vue.js](https://alexjoverm.github.io/series/Unit-Testing-Vue-js-Components-with-the-Official-Vue-Testing-Tools-and-Jest/) blog
  - [Vue.js Testing](https://vuex.vuejs.org/en/testing.html)


<a name="axios"><br/></a>
### More about `axios`

&raquo; See [axios](https://github.com/axios/axios)
  - [API](https://github.com/axios/axios#axios-api) and
    [aliases](https://github.com/axios/axios#request-method-aliases)
  - [Request config options](https://github.com/axios/axios#request-config)
  - [Response schema](https://github.com/axios/axios#response-schema)


&raquo; Examples:
  - The `ex` object with `try { await axios.get() } catch (ex)` pattern:

  ```
  {
    Error: connect ECONNREFUSED 127.0.0.1:8001
    errno: 'ECONNREFUSED',
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '127.0.0.1',
    port: 8001,
    config:
     { adapter: [Function: httpAdapter],
       transformRequest: { '0': [Function: transformRequest] },
       transformResponse: { '0': [Function: transformResponse] },
       timeout: 0,
       xsrfCookieName: 'XSRF-TOKEN',
       xsrfHeaderName: 'X-XSRF-TOKEN',
       maxContentLength: -1,
       validateStatus: [Function: validateStatus],
       headers:
        { Accept: 'application/json, text/plain, *\/*',
          'User-Agent': 'axios/0.17.1' },
       method: 'get',
       url: 'http://localhost:8001/v1/hancock/domains?pageSize=5',
       data: undefined },
    request:
     Writable {
       _writableState:
        WritableState {
          objectMode: false,
          highWaterMark: 16384,
          finalCalled: false,
          needDrain: false,
          ending: false,
          ended: false,
          finished: false,
          destroyed: false,
          decodeStrings: true,
          defaultEncoding: 'utf8',
          length: 0,
          writing: false,
          corked: 0,
          sync: true,
          bufferProcessing: false,
          onwrite: [Function: bound onwrite],
          writecb: null,
          writelen: 0,
          bufferedRequest: null,
          lastBufferedRequest: null,
          pendingcb: 0,
          prefinished: false,
          errorEmitted: false,
          bufferedRequestCount: 0,
          corkedRequestsFree: [Object] },
       writable: true,
       domain: null,
       ... },
    response: undefined
  }
  ```

  - request config

  ```
  {
    url: '/api/path', // server URL for the request

    method: '', // default to 'get'.

    baseURL: '', // to be prepended to `url` unless `url` is absolute.

    transformRequest: [function (data, headers) {
      // - Allows changes to the request data before it is sent to the server
      // - Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // - The last function in the array must return a string or an instance of
      //   Buffer, ArrayBuffer, FormData or Stream
      // - You may modify the headers object.
      return data;
    }],

    transformResponse: [function (data) {
      // allows changes to the response data to be made
      // before it is passed to then/catch
      return data;
    }],

    headers: {'X-Requested-With': 'XMLHttpRequest'},

    params: { // must be a plain object or a URLSearchParams object
      ID: 12345
    },

    paramsSerializer: function(params) {
      // optional function in charge of serializing `params`
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },

    data: {}, // only applicable for request methods 'PUT', 'POST', and 'PATCH'

    timeout: 1000, // milliseconds before the request timed out and aborted.

    withCredentials: false, // default

    // `adapter` allows custom handling of requests which makes testing easier.
    adapter: function (config) {
    },

    // `auth` sets/overwrites `Authorization` header and indicates that
    // HTTP Basic auth should be used with supplied credentials.
    auth: {
      username: 'cyberint',
      password: 's00pers3cret'
    },

    // `responseType` options:
    //   'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // `onUploadProgress` allows handling of progress events for uploads
    onUploadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },

    // `onDownloadProgress` allows handling of progress events for downloads
    onDownloadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },

    // `maxContentLength` defines the max size of the http response content allowed
    maxContentLength: 2000,

    // the promise will be resolved, if `validateStatus` returns `true` (or is
    // set to `null` or `undefined`); otherwise, the promise will be rejected.
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },

    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 5, // default

    socketPath: null, // default

    // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
    // and https requests, respectively, in node.js. This allows options to be added like
    // `keepAlive` that are not enabled by default.
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),

    proxy: {},

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    cancelToken: new CancelToken(function (cancel) {
    })
  }
  ```



<a name="coverage"><br/></a>
## Coverage Report

  After running unit tests (`npm run test`), check code coverage
  at `test/unit/coverage/lcov-report/index.html`.



<a name="e2e"><br/></a>
## End-to-end

&raquo; TBD
