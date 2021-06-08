<template>
  <DateLineGraph :chartData="chartData" :xLabel="xLabel" :yLabel="yLabel" />
</template>

<script>
import DateLineGraph from '@/components/presentationals/date/DateLineGraph.vue';
import { dateToString } from '@/utils/date.js';

export default {
  props: {
    xLabel: String,
    yLabel: String,
  },

  components: { DateLineGraph },

  computed: {
    chartData() {
      const datasets = [
        {
          label: dateToString(this.$store.getters.selectedDate[0], 'YYYY.MM.DD'),
          borderColor: '#2E447F',
          backgroundColor: '#2E447F',
          fill: false,
          data: this.$store.getters.firstDateByTimes.map(time =>
            time.reduce((acc, cur) => acc + cur.max_user, 0)
          ),
          tension: 0.1,
        },
      ];
      if (this.$store.getters.selectedDate[1]) {
        datasets.push({
          label: dateToString(this.$store.getters.selectedDate[1], 'YYYY.MM.DD'),
          data: this.$store.getters.secondDateByTimes.map(time =>
            time.reduce((acc, cur) => acc + cur.max_user, 0)
          ),
          borderColor: '#CF4F2E',
          backgroundColor: '#CF4F2E',
          fill: false,
          tension: 0.1,
        });
      }
      return {
        labels: Array.from({ length: 24 }).map((_, i) => i),
        datasets,
      };
    },
  },

  mounted() {},
};
</script>
