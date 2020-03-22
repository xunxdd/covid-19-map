<script>
import regionDataModal from '@/components/region-data-modal.vue';

export default {
  name: 'case-map',
  components: {
    regionDataModal
  },
  props: {
    title: {
      type: String,
      default: 'Total Confirmed'
    },
    type: {
      type: String,
      default: 'Confirmed'
    },
    maxMin: {
      type: Object
    },
    center: {
      type: Object
    },
    markers: {
      type: Array
    }
  },
  data() {
    return {
      showDialog: false,
      regionData: {}
    };
  },
  methods: {
    showRegionData(data) {
      this.regionData = data;
      this.showDialog = true;
    }
  }
};
</script>
<template>
  <v-card class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-container fluid>
      <h4 class="red--text">Total: {{ maxMin.nationalTotal }}</h4>
      <h4 class="red--text">
        State Highest: {{maxMin.highestState['Province/State']}} / Total {{ maxMin.max }}</h4>
      <h4 class="red--text">
        Total Number of States/Regions with {{ type }}:
        {{ maxMin.totalStates }} (* including Cruise ships)
      </h4>

      <gmap-map :center="center" :zoom="4" style="width:100%;  height: 500px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :icon="m.icon"
          @click="showRegionData(m)"
        ></gmap-marker>
      </gmap-map>
      <region-data-modal
        :show-dialog="showDialog"
        :type="type"
        :data="regionData"
        @close="showDialog = false"
      />
    </v-container>
  </v-card>
</template>
