<script>
import { HorizontalBar, mixins } from 'vue-chartjs';

export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: context => `총 동시 접속자 수: ${context.xLabel}명`,
          },
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
