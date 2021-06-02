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
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40].reverse(),
            fill: false,
            borderColor: 'red',
            tension: 0.1,
          },
        ],
      },
    };
  },
};
</script>
