<script>
import TrendChart from '@/components/trend-chart.vue';
import Vue from 'vue';

const chartColors = {
  red: 'rgb(255, 99, 132)',
  black: 'rgb(0, 0, 0)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

export default Vue.extend({
  name: 'daily-chart',
  components: {
    TrendChart
  },
  props: {
    confirmed: {
      type: Object
    },
    recovered: {
      type: Object
    },
    deaths: {
      type: Object
    }
  },
  data: function() {
    return {
      confirmedChartData: {},
      deathChartData: {},
      recoveredChartData: {},
      activeChartData: {},
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }
          ]
        }
      }
    };
  },
  created() {
    const usActiveTotal = {};
    Object.keys(this.confirmed).forEach(key => {
      const active =
        this.confirmed[key] - this.deaths[key] - this.recovered[key];
      usActiveTotal[key] = active;
    });

    this.confirmedChartData = this.getChartData(
      this.confirmed,
      'Confirmed Cases',
      chartColors.red
    );

    this.deathChartData = this.getChartData(
      this.deaths,
      'Death',
      chartColors.black
    );

    this.recoveredChartData = this.getChartData(
      this.recovered,
      'Recovered',
      chartColors.green
    );

    this.activeChartData = this.getChartData(
      usActiveTotal,
      'Active',
      chartColors.purple
    );
  },
  methods: {
    getChartData(data, label, color) {
      return {
        labels: Object.keys(data),
        filled: false,
        datasets: [
          {
            fill: false,
            label,
            backgroundColor: color,
            borderColor: color,
            data: Object.values(data)
          }
        ]
      };
    }
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <div style="width:400px; height: 400px">
          <trend-chart
              class="line-chart mx-auto"
              :chart-data="confirmedChartData" :options="options"/>
        </div>
      </v-col>
      <v-col>
        
          <div style="width:400px; height: 400px">
          <trend-chart
              :chart-data="deathChartData" 
              :options="options"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
        <v-col>
          <div style="width:400px; height: 400px">
          <trend-chart
              :chart-data="recoveredChartData" 
              :options="options"/>
        </div>
      </v-col>
        <v-col>
          <div style="width:400px; height: 400px">
          <trend-chart
              :chart-data="activeChartData" 
              :options="options"/>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>
<style scoped>
</style>
