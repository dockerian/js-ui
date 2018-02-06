# Vue.js Testing

> Dockerian JsUi Vue.js Testing

<br/><a name="contents"></a>
## Contents

  - [unit testing](#unit)
  - [coverage report](#coverage)
  - [e2e testing](#e2e)


<a name="unit"><br/></a>
## Unit Testing

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
  Here are the test spec:

  ```
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


<a name="coverage"><br/></a>
## Coverage Report

  After running unit tests (`npm run test`), check code coverage
  at [generated report](unit/coverage/lcov-report/index.html).



<a name="e2e"><br/></a>
## End-to-end
