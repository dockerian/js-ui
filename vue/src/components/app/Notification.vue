<template>
  <div class="notification">
    <span class="message">{{ message }}</span>
    <button id="btn-ellipsis" class="btn-ellipsis"/>
  </div>
</template>

<script>

export default {
  name: 'Notification',
  components: {
  },
  props: {
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-ellipsis, #btn-ellipsis {
  background-color: transparent;
  background-image: url(../../assets/icon_ellipsis.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 0px dotted transparent;
  cursor: pointer;
  display: inline-block;
  height: 8px; width: 20px;
  margin: 2px 2px 3px 2px; padding: 0px;
  vertical-align: middle;
  position: relative;
  outline: none;
}
.message {
  display: inline-block;
  height: 28px; line-height: 28px; padding-bottom: 5px;
  vertical-align: middle;
  position: static;
}
.notification {
  display: inline-block;
  height: 28px; line-height: 28px;
  margin: 0px; padding: 0px;
  position: absolute;
  vertical-align: middle;
  text-align: right;
}
</style>
