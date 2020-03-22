<script>
/* eslint-disable */
import ConfirmedCaseMap from '@/components/confirmed-case-map.vue';

export default {
  name: 'home',
  components: {
    ConfirmedCaseMap
  }
};
</script>

<template>
  <div>
    <iframe
      width="817"
      height="505"
      seamless
      frameborder="0"
      scrolling="no"
      src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRm1eESQZd6j7euEDqlH3DQ8EWxGKjLWH3bmDvICJMNGJjw1GgFDS4fhRa1JN8-bGuelwqTAW4AoP6e/pubchart?oid=1991323255&amp;format=interactive"
    ></iframe>
    <v-divider />
    <confirmed-case-map />
  </div>
</template>

