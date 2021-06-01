<script>
import { HorizontalBar } from 'vue-chartjs';

export default {
  extends: HorizontalBar,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, {
      legend: {
        display: false,
      },
    });
  },
};
</script>
