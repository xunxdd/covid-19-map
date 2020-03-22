<script>
import { gmapApi } from 'vue2-google-maps';
import confirmed from '@/assets/json-data/time_series_19-covid-Confirmed.json';
import deaths from '@/assets/json-data/time_series_19-covid-Deaths.json';
import { dataSrv } from '@/services/data.srv';
import caseMap from '@/components/case-map.vue';

export default {
  name: 'confirmed-case-map',
  components: {
    caseMap
  },
  data() {
    return {
      loading: false,
      center: { lat: 39.5, lng: -98.35 },
      confirmedData: { markers: [], maxMin: {} },
      deathsData: { markers: [], maxMin: {} }
    };
  },
  computed: {
    google: gmapApi
  },

  mounted: async function() {
    this.loading = true;
    await this.$gmapApiPromiseLazy({});
    this.confirmedData = this.processData(confirmed, 10);
    this.deathsData = this.processData(deaths, 1);
    this.loading = false;
  },
  methods: {
    processData(data, scale) {
      const cases = dataSrv.processData(data, scale);
      cases.markers = this.updateIcon(cases.markers);
      return cases;
    },

    updateIcon(markers) {
      return markers.map(marker => {
        const mark = { ...marker };
        mark.icon.path = this.google.maps.SymbolPath.CIRCLE;

        return mark;
      });
    }
  }
};
</script>

<template>
  <v-card :loading="loading">
    <case-map
      v-if="!loading && confirmedData.markers.length"
      :max-min="confirmedData.maxMin"
      :center="center"
      type="confirmed cases"
      title="Confirmed Cases in the United States"
      :markers="confirmedData.markers"
    />
    <v-divider />

    <case-map
      v-if="!loading && deathsData.markers.length"
      :max-min="deathsData.maxMin"
      :center="center"
      type="deathes"
      title="Deaths Due to Covid-19 in the United States"
      :markers="deathsData.markers"
    />
    <v-divider />
  </v-card>
</template>
