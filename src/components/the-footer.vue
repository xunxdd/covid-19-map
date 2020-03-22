<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'the-footer',
  props: {
    footerColor: {
      type: String,
      default: 'secondary'
    }
  }
});
</script>

<template>
  <v-footer dark class="footer mb-0" app>
    <v-spacer />
    <span class="copyright white--text">&copy;2020, All rights reserved.</span>
    <v-spacer />
  </v-footer>
</template>

<style lang="scss" scoped>
.footer {
  text-align: center;
  color: #fff;
  bottom: 0;
  width: 100%;
  text-shadow: #000 0.1em 0.1em 0.2em;
}
</style>
