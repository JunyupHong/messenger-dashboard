<script>
import { HorizontalBar } from 'vue-chartjs';

export default {
  extends: HorizontalBar,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: context => `동시 접속자 수: ${context.xLabel}명`,
        },
      },
    });
  },
};
</script>
