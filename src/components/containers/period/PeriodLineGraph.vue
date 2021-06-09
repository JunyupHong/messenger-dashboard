<template>
  <PeriodLineGraph xLabel="날짜" yLabel="동시 접속자 수" :chartData="chartData" />
</template>

<script>
import PeriodLineGraph from '@/components/presentationals/period/PeriodLineGraph.vue';
import { dateToString } from '@/utils/date.js';
import { mapState } from 'vuex';

export default {
  components: { PeriodLineGraph },

  computed: {
    ...mapState('period', {
      userCounts: 'userCounts',
      customPeriods: state => {
        const periods = [];
        let start = new Date(state.selectedPeriod[0]);
        while (start <= state.selectedPeriod[1]) {
          periods.push(dateToString(start));
          start.setDate(start.getDate() + 1);
        }
        return periods;
      },
    }),

    labels() {
      return this.customPeriods.map(period => dateToString(new Date(period), 'MM.DD'));
    },

    userCountData() {
      return this.customPeriods.map(period => this.userCounts.get(period));
    },

    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: '동시 접속자 수',
            data: this.userCountData,
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
