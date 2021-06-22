<template>
  <PeriodLineGraph xLabel="날짜" yLabel="동시 접속자 수" :chartData="chartData" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PeriodLineGraph from '@/components/presentationals/period/PeriodLineGraph.vue';
import { dateToString } from '@/utils/date';

@Component({
  components: { PeriodLineGraph },
})
export default class PeriodLineGraphContainer extends Vue {
  get userCounts() {
    return this.$store.state.period.userCounts;
  }

  get customPeriods() {
    const periods = [];
    let start = new Date(this.$store.state.period.selectedPeriod[0]);
    while (start <= this.$store.state.period.selectedPeriod[1]) {
      periods.push(dateToString(start));
      start.setDate(start.getDate() + 1);
    }
    return periods;
  }

  get labels() {
    return this.customPeriods.map(period => dateToString(new Date(period), 'MM.DD'));
  }

  get userCountData() {
    return this.customPeriods.map(period => this.userCounts.get(period));
  }

  get chartData() {
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
  }
}
</script>
