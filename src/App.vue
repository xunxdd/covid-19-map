<script lang="ts">
import Vue from 'vue';
import Layout from './layout.vue';

export default Vue.extend({
  name: 'app',
  components: { Layout }
});
</script>

<template>
  <div id="app">
    <v-app>
      <layout>
        <router-view />
      </layout>
    </v-app>
  </div>
</template>
