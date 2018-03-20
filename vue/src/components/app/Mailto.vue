<template>
  <a v-bind:href="'mailto:' + mailAddress"
     v-bind:title="'e-mail to ' + contactName">
    {{ contactName }}
  </a>
</template>

<script>

export default {
  name: 'Mailto',
  components: {
  },
  props: {
    contact: String
  },
  data () {
    return {
      contactName: '',
      mailAddress: ''
    }
  },
  computed: {
  },
  methods: {
  },
  mounted: function () {
    let regex = /(.+)<(.+)>/
    let match = regex.exec(this.contact)
    if (match) {
      this.contactName = match[1].trim()
      this.mailAddress = match[2]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
