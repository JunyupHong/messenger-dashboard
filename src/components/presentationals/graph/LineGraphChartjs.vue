<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    });
  },
};
</script>
