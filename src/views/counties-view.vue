<script>
import CountyMap from '@/components/county-map.vue';
//import CovidDataTable from "@/components/covid-data-table.vue";

export default {
  name: 'counties-view',
  components: {
    CountyMap
  },

  data: function() {
    return {
      stateName: this.$route.params.region || 'Washington',
      states: [],
      viewType: 'map'
    };
  },

  computed: {},
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
      <v-toolbar-title
        >County-by-county breakdown of {{ stateName }}</v-toolbar-title
      >
      <v-spacer />
      <v-btn text @click="updateType('map')"
        ><v-icon>mdi-google-maps</v-icon>Map</v-btn
      >
      <v-btn text @click="updateType('chart')"
        ><v-icon>mdi-chart-bell-curve-cumulative</v-icon>ChartView</v-btn
      >
      <v-btn text @click="updateType('data')"
        ><v-icon>mdi-table</v-icon>Data</v-btn
      >
    </v-toolbar>
    <county-map :state-name="stateName" />
    <!--    <daily-chart
      v-show="viewType === 'chart'"
      :confirmed="confirmedTotal"
      :recovered="recoveredTotal"
      :deaths="deathsTotal"
    />
    <covid-data-table :data-items="dataItems" v-show="viewType === 'data'" />-->
  </v-card>
</template>
