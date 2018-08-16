<!-- HelloWorld perspective -->
<template>
  <div id="demo">
    <div id="demo-img"></div>
    <div id="demo-div">
      <div id="demo-p">
        <div id="demo-lang-select">
          <div id="demo-lang-select-label">
          Select language:
          </div>
          <Select
            accessKey="L"
            v-bind:required="true"
            v-model="selectedLang">
            <Option v-for="(lang, index) in langList"
              v-bind:key="index"
              v-bind:selected="lang.key === selectedLang"
              v-bind:label="lang.value"
              v-bind:value="lang.key">
              <span>{{ lang.value }}</span>
              <span v-if="lang.key !== selectedLang" class="demo-hint">
                {{ texts[lang.key] }} : {{ lang.key }}
              </span>
            </Option>
          </Select>
        </div>
        <div id="greeting">
          <h1 v-bind:class="`greeting ${h1Class}`">
            {{ greetingText }}<span>{{ name ? ', ' + name : '' }}</span>
          </h1>
          <!--NOTE: DEBUG only
          <br/>...<br/>..<br/>...<br/>...<br/>...<br/>
          ..end...
          -->
        </div>
        <div id="demo-error">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import iView from 'iview'
import * as _const from '@/store/_constants'
import * as _constUser from '@/store/user/_constants'
import * as helper from '@/helper/greetings'
import { mapGetters } from 'vuex'

Vue.use(Element, { locale })
Vue.use(iView)

export default {
  name: 'HelloWorld',
  components: {
  },
  props: {
  },
  data () {
    return {
      langList: helper.greetings.langList,
      langs: helper.greetings.langs,
      texts: helper.greetings.hello,
      selectedLang: 'en',
      default: 'en'
    }
  },
  computed: {
    ...mapGetters({
      signedIn: _const.USER_SIGNED_IN,
      user: `user/${_constUser.USER}`
    }),
    error: function () {
      let lang = this.selectedLang
      return this.texts[lang] != null ? ''
        : `No translation to language "${this.langs[lang]}" [${lang}]`
    },
    h1Class: function () {
      return this.texts[this.selectedLang] != null ? '' : 'default'
    },
    greetingText: {
      get: function () {
        let greeting = this.texts[this.selectedLang] || this.texts[this.default]
        return `${greeting}`
      }
    },
    name: function () {
      return this.signedIn ? this.user.fullName : ''
    }
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#demo {
  /*
  // NOTE: DEBUG only
  border: 1px dotted red;
  */
  height: 100vh; width: 100%;
  padding: 1px; top: -17px; padding-bottom: 97px;
  position: fixed;
}
.demo-hint {
  color: #cccccc;
  float: right;
}
#demo-lang-select {
  display: flex;
  flex-grow: 100;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 60px;
  margin: 5px 0px 5px 2px;
  position: relative;
  text-align: left;
  width: 100%;
}
#demo-lang-select-label {
  padding: 5px;
  text-align: right;
  vertical-align: middle;
  white-space: nowrap;
  width: 150px;
}
#demo-img {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  z-index: -1;
  */
  content: "";
  background-attachment: scroll;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/p_demo.svg');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 33%;
  opacity: 0.07;
  padding: 0px; margin: 0px; padding-bottom: 85px;
  bottom: 0; left: 0; right: 0; top: 0;
  height: 100%; width: 100%;
  position: absolute;
}
#demo-div {
  /*
  // NOTE: DEBUG only
  border: 1px dotted blue;
  */
  height: 100vh; width: 100%;
  padding: 0px; margin-top: 0px; padding-bottom: 97px;
  bottom: 0; left: 0; right: 0; top: 0;
  opacity: 1;
}
#demo-p {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 99%; width: 100%;
  padding: 3px 15px 3px 3px; margin: 0px;
  position: relative;
  overflow-y: auto;
}
#demo-error {
  color: darkred;
  max-height: 60px; min-height: 2em;
  margin: 5px 0px 9px 2px;
  text-align: right;
  width: 100%;
}

div#greeting {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 79%; min-height: 65%; width: 100%;
  margin-bottom: 2em;
  vertical-align: middle;
}
div h1 > span {
  color: darkgray;
}
div h1.greeting {
  color: darkgreen;
  font-size: 56pt;
  text-align: center;
  width: 100%;
}
div h1.default {
  color: darkred;
  font-style: italic;
}

@media all and (max-width: 600px) {
  #demo-lang-select {
    flex-direction: row;
    right: 0px;
  }
}
@media all and (min-width: 600px) {
  #demo-p {
    text-align: right;
  }
  #demo-lang-select {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
  #demo-lang-select > div {
    max-width: 520px;
  }
}

</style>
