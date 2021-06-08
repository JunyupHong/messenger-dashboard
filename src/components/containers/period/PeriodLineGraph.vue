<template>
  <PeriodLineGraph xLabel="날짜" yLabel="동시 접속자 수" :chartData="chartData" />
</template>

<script>
import PeriodLineGraph from '@/components/presentationals/period/PeriodLineGraph.vue';
import { dateToString } from '@/utils/date.js';

export default {
  components: { PeriodLineGraph },

  computed: {
    labels() {
      return this.$store.getters.customPeriods.map(period =>
        dateToString(new Date(period), 'MM.DD')
      );
    },
    userCounts() {
      return this.$store.getters.customPeriods.map(period =>
        this.$store.state.period.userCounts.get(period)
      );
    },
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: '동시 접속자 수',
            data: this.userCounts,
            fill: false,
            borderColor: '#2E447F',
            backgroundColor: '#2E447F',
            tension: 0.1,
          },
        ],
      };
    },
  },
};
</script>
