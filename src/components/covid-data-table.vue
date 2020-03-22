<script>
import Vue from 'vue';
import { dataSrv } from '@/services/data.srv';

export default Vue.extend({
  name: 'covid-data-table',
  props: {
    dataItems: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Confirmed', value: 'confirmed' },
        { text: 'Recovered', value: 'recovered' },
        { text: 'Death', value: 'death' },
        { text: 'Active', value: 'active' }
      ]
    };
  },
  methods: {
    customSort: dataSrv.customSort
  }
});
</script>

<template>
  <v-data-table
    class="mx-10 my-5"
    :custom-sort="customSort"
    :headers="headers"
    :items="dataItems"
    :must-sort="true"
    :sort-by="'date'"
    :sort-desc="true"
    :items-per-page="100"
  ></v-data-table>
</template>
