<template>
  <DateLegendLineGraph
    :xLabel="xLabel"
    :yLabel="yLabel"
    :legends="legends"
    :chartData="chartData"
  />
</template>

<script>
import DateLegendLineGraph from '@/components/presentationals/date/DateLegendLineGraph';

export default {
  props: {
    xLabel: String,
    yLabel: String,
    legends: {
      type: Array,
      require: true,
    },
  },
  components: { DateLegendLineGraph },
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
          {
            label: 'My First Dataset',
            data: [12, 73, 23, 45, 74, 35, 36],
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
          {
            label: 'My First Dataset',
            data: [12, 73, 23, 45, 74, 35, 36].reverse(),
            fill: false,
            borderColor: 'orange',
            tension: 0.1,
          },
        ],
      },
    };
  },
};
</script>
