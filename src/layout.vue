<script>
import Vue from 'vue';
import TheFooter from '@/components/the-footer.vue';
import confirmed from '@/assets/json-data/time_series_19-covid-Confirmed.json';
import { dataSrv } from '@/services/data.srv';

export default Vue.extend({
  name: 'layout',
  components: { TheFooter },
  data: function() {
    const usData = dataSrv.filterByRegion(confirmed);
    const dataObj = usData[0];
    const keys = Object.keys(dataObj);
    return {
      drawer: null,
      mostRecentDateStr: keys[keys.length - 1],
      navItems: [
        { route: { name: 'Home' }, text: 'Map', cssClass: 'mx-2 pl-3' },
        { route: { name: 'trend-chart' }, text: 'National Daily', cssClass: 'mx-2' },
        {
          route: { name: 'state-trend-chart', region: 'New York' },
          text: 'State/Region Daily',
          cssClass: 'mx-2'
        },
        { route: { name: 'state-testing-data' }, text: 'Testing Report', cssClass: 'mx-2' }
      ]
    };
  }
});
</script>

<template>
  <div>
    <v-content>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        temporary
        class="hidden-sm-and-up"
      >
        <v-list
          dense
          class="drawer"
        >
          <v-list-item
            v-for="itm in navItems"
            :key="`${itm.route.name}-drawer`"
          >
            <router-link :to="itm.route">
              <span class="black--text">{{itm.text}}</span>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        color="black"
      >
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          color="white"
          class="hidden-sm-and-up"
        />
        <v-toolbar-title class="home-logo pl-0">
          <img
            src="@/assets/images/covid-19-sm.png"
            alt="logo"
          />
        </v-toolbar-title>
        <v-toolbar-items
          class="hidden-sm-and-down"
          style="height:auto"
        >
          <router-link
            v-for="itm in navItems"
            :key="`${itm.route.name}-nav`"
            :to="itm.route"
            :class="itm.cssClass"
          >
            {{itm.text}}
          </router-link>
        </v-toolbar-items>
        <v-spacer />

        <v-btn
          color="white"
          text
          class="hidden-sm-and-down"
        >
          <a
            href="https://coronavirus.jhu.edu/"
            target="_blank"
          >
            <span class="white--text">Data Source</span>
          </a>
        </v-btn>
        <v-menu
          left
          bottom
          color="white"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              color="white"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <a
                href="https://coronavirus.jhu.edu/map.html"
                target="_blank"
              ><span class="black--text">John Hopkins Latest</span></a>
            </v-list-item>
            <v-list-item>
              <a
                href="https://www.worldometers.info/coronavirus/"
                target="_blank"
              ><span class="black--text">WorldOMeter</span></a>
            </v-list-item>
            <v-list-item>
              <a
                href="https://www.cdc.gov/"
                target="_blank"
              ><span class="black--text">CDC</span></a>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-alert
        text
        dense
        color="teal"
        icon="mdi-clock-fast"
        border="left"
        dismissible
        type="info"
      >
        Data updated on {{ mostRecentDateStr }}
        <span class="font-italic overline">(including cruise ships)</span>.
      </v-alert>
      <!-- content gets slotted in here-->
      <slot />
      <the-footer />
    </v-content>
  </div>
</template>
<style lang="scss" scoped>
a {
  color: white !important;
  text-decoration: none;
}

.home-logo {
  height: 41px;
}
</style>
