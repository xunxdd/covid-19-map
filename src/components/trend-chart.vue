<script lang="ts">
import Vue from 'vue';
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default Vue.extend({
  name: 'trend-chart',
  mixins: [Line, reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
// any to bypass incomplete typescript support for multiple mixins
});
</script>
