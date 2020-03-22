<script>
import DailyChart from '@/components/daily-chart.vue';
import confirmed from '@/assets/json-data/time_series_19-covid-Confirmed.json';
import deaths from '@/assets/json-data/time_series_19-covid-Deaths.json';
import recovered from '@/assets/json-data/time_series_19-covid-Recovered.json';
import { dataSrv } from '@/services/data.srv';
import Vue from 'vue';
import CovidDataTable from '@/components/covid-data-table.vue';

export default Vue.extend({
  name: 'chart-view',
  components: {
    DailyChart,
    CovidDataTable
  },
  data: function() {
    return {
      stateName: this.$route.params.region || 'Washington',
      states: [],
      viewType: 'chart'
    };
  },

  computed: {
    confirmedTotal: function() {
      const usStatesConfirmed = dataSrv.getUsStates(confirmed);
      return dataSrv.getStateData(usStatesConfirmed, this.stateName);
    },

    deathsTotal: function() {
      const usStatesDeaths = dataSrv.getUsStates(deaths);
      return dataSrv.getStateData(usStatesDeaths, this.stateName);
    },
    recoveredTotal: function() {
      const usStatesRecovered = dataSrv.getUsStates(recovered);
      return dataSrv.getStateData(usStatesRecovered, this.stateName);
    },
    dataItems: function() {
      return dataSrv.mapData(this.confirmedTotal, this.deathsTotal, this.recoveredTotal);
    }
  },

  created() {
    const usStatesConfirmed = dataSrv.getUsStates(confirmed);
    this.states = usStatesConfirmed.map(st => st['Province/State']);
  },
  methods: {
    updateType(type) {
      if (this.viewType !== type) {
        this.viewType = type;
      }
    }
  }
});
</script>

<template>
  <div>
    <v-card>
      <v-toolbar
        color="indigo"
        dark
      >
        <v-toolbar-title>
          <span class="headline">{{ stateName }} </span> Daily
          Trend
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          text
          @click="updateType('chart')"
        >
          <v-icon>mdi-chart-bell-curve-cumulative</v-icon>ChartView
        </v-btn>
        <v-btn
          text
          @click="updateType('data')"
        >
          <v-icon>mdi-table</v-icon>Data
        </v-btn>
        <div
          style="width: 250px"
          class="ml-5"
        >
          <v-autocomplete
            v-model="stateName"
            clearable
            dense
            filled
            :items="states"
          />
        </div>
      </v-toolbar>
      <daily-chart
        v-show="viewType == 'chart'"
        :key="new Date().getTime()"
        :confirmed="confirmedTotal"
        :recovered="recoveredTotal"
        :deaths="deathsTotal"
      />
      <covid-data-table
        v-show="viewType === 'data'"
        :data-items="dataItems"
      />
    </v-card>
  </div>
</template>
<style scoped></style>
