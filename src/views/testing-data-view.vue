<script>
import axios from 'axios';
import { dataSrv } from '@/services/data.srv';

export default {
  name: 'testing-data-view',
  components: {},
  data() {
    return {
      loading: false,
      testingData: [],
      usData: {},
      search: '',
      headers: [
        { text: 'State', value: 'state' },
        { text: 'Positive', value: 'positive' },
        { text: 'Negative', value: 'negative' },
        { text: 'Death', value: 'death' },
        { text: 'Total', value: 'total' },
        { text: 'Last Updated', value: 'lastUpdateEt' },
        { text: 'Last Check Time (approx.) ', value: 'checkTimeEt' }
      ]
    };
  },
  async mounted() {
    this.loading = true;
    const usResponse = await axios.get('https://covidtracking.com/api/us');
    const stateResponse = await axios.get('https://covidtracking.com/api/states');
    this.testingData = stateResponse.data;
    this.usData = usResponse.data[0];
    this.loading = false;
  },
  methods: {
    customSort: dataSrv.customSort
  }
};
</script>

<template>
  <v-card>
    <v-toolbar
      color="indigo"
      dark
    >
      <v-toolbar-title>State-wide testing report</v-toolbar-title>
      <v-spacer />
      <v-icon>mdi-database</v-icon>
      Data from: <a
        href="http://covidtracking.com"
        target="_blank"
        class="white--text"
      >
        The Covid tracking project</a>
    </v-toolbar>
    <v-data-table
      class="mx-10 my-5"
      :loading="loading"
      :custom-sort="customSort"
      :headers="headers"
      :items="testingData"
      sort-by="total"
      :sort-desc="true"
      :must-sort="true"
      :items-per-page="100"
      :hide-default-footer="true"
      :search="search"
    >
      <template #body.prepend={headers}>
        <tr>
          <td :colspan="headers.length">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              placeholder="filter states"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </td>
        </tr>
        <tr class="blue lighten-5">
          <td>
            United States
          </td>
          <td>
            {{usData.positive}}
          </td>
          <td>
            {{usData.negative}}
          </td>
          <td>
            {{usData.death}}
          </td>
          <td>
            {{usData.total}}
          </td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

