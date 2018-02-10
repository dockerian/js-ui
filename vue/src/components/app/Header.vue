<template>
  <div class="header">
  <header id="header">
    <button id="btn-menu" class="btn-menu"/>
  </header>
  </div>
</template>

<script>
// using mapGetters whenever computed data not mapping directly to state
// import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

var data = {}

export default {
  name: 'Header',
  data () {
    return data
  },
  computed: mapState({
    userSignedIn: state => state.userSignedIn
  }),
  methods: {
    // note: adding such changing state method (or thru mapActions) could
    // cause warning "computed property was assigned to but it has no setter"
    // which requires computed property has both getter and setter.
    // setUserSignedIn (ev) {
    //   this.$store.dispatch('userSignedIn', ev.target.value)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #btn-menu {
    height: 31px; width: 31px;
  }
  .btn-menu {
    background-color: transparent;
    background-image: url(../../assets/icon_menu.svg);
    background-repeat: no-repeat;
    background-position: center;
    border: 0px dotted transparent;
    cursor: pointer;
    margin: 1px; padding: 1px;
  }
  .header {
    background-color: white;
    height: 33px; margin: 0; padding: 0;
    top: 0; position: fixed;
    text-align: left;
    width: 100%;
  }
</style>
