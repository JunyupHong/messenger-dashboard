<template>
  <DateLineGraph :chartData="chartData" :xLabel="xLabel" :yLabel="yLabel" />
</template>

<script>
import DateLineGraph from '@/components/presentationals/date/DateLineGraph.vue';

export default {
  props: {
    xLabel: String,
    yLabel: String,
  },
  components: { DateLineGraph },
  data() {
    return {
      chartData: {
        labels: Array.from({ length: 24 }).map((_, i) => i),
        datasets: [
          {
            label: '2021.05.16',
            backgroundColor: '#2E447F',
            fill: false,
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            tension: 0.1,
          },
          {
            label: '2021.05.18',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            backgroundColor: '#CF4F2E',
            fill: false,
            tension: 0.1,
          },
        ],
      },
    };
  },
};
</script>
