<script>
import DailyChart from '@/components/daily-chart.vue';
import CovidDataTable from '@/components/covid-data-table.vue';
import confirmed from '@/assets/json-data/time_series_19-covid-Confirmed.json';
import deaths from '@/assets/json-data/time_series_19-covid-Deaths.json';
import recovered from '@/assets/json-data/time_series_19-covid-Recovered.json';
import { dataSrv } from '@/services/data.srv';

export default {
  name: 'chart-view',
  components: {
    DailyChart,
    CovidDataTable
  },

  data: function() {
    const confirmedTotal = dataSrv.dailyUsTotal(confirmed);
    const deathsTotal = dataSrv.dailyUsTotal(deaths);
    const recoveredTotal = dataSrv.dailyUsTotal(recovered);
    return {
      confirmedTotal,
      deathsTotal,
      recoveredTotal,
      dataItems: dataSrv.mapData(confirmedTotal, deathsTotal, recoveredTotal),
      viewType: 'chart'
    };
  },
  methods: {
    updateType(type) {
      if (this.viewType !== type) {
        this.viewType = type;
      }
    }
  }
};
</script>

<template>
  <v-card>
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Us Daily Trend </v-toolbar-title>
      <v-spacer />
      <v-btn text @click="updateType('chart')"
        ><v-icon>mdi-chart-bell-curve-cumulative</v-icon>ChartView</v-btn
      >
      <v-btn text @click="updateType('data')"
        ><v-icon>mdi-table</v-icon>Data</v-btn
      >
    </v-toolbar>

    <daily-chart
      v-show="viewType === 'chart'"
      :confirmed="confirmedTotal"
      :recovered="recoveredTotal"
      :deaths="deathsTotal"
    />
    <covid-data-table :data-items="dataItems" v-show="viewType === 'data'" />
  </v-card>
</template>
<style scoped></style>
