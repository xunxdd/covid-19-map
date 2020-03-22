<script>
import confirmed from '@/assets/json-data/time_series_19-covid-Confirmed.json';
import deaths from '@/assets/json-data/time_series_19-covid-Deaths.json';
import recovered from '@/assets/json-data/time_series_19-covid-Recovered.json';

import { dataSrv } from '@/services/data.srv';

export default {
  name: 'region-data-modal',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    dialog: {
      get() {
        return this.showDialog;
      },
      set(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    stateData() {
      const regionName = this.data['Province/State'];
      const stateConfirmed = dataSrv.findRegionLatest(confirmed, regionName);
      const stateDeath = dataSrv.findRegionLatest(deaths, regionName);
      const stateRecovered = dataSrv.findRegionLatest(recovered, regionName);
      return {
        stateConfirmed,
        stateDeath,
        stateRecovered,
        sateActive: stateConfirmed - stateDeath - stateRecovered
      };
    }
  }
};
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">{{data['Province/State']}}, {{data['Country/Region']}}
        </v-card-title>

        <v-card-text>
         <h4> Total Confirmed: {{stateData.stateConfirmed}}</h4>
         <h4> Total Deaths: {{stateData.stateDeath}}</h4>
         <h4> Total Recovered: {{stateData.stateRecovered}}</h4>
         <h4> Total Active: {{stateData.sateActive}}</h4>

          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <router-link :to="{ name:  'state-trend-chart', region: data['Province/State']}">
             View State Details
          </router-link>
          <v-btn
            color="green darken-1"
            text
            @click.stop="dialog=false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
