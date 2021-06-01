<template>
  <PeriodLineGraph xLabel="날짜" yLabel="동시 접속자 수" :chartData="chartData" />
</template>

<script>
import PeriodLineGraph from '@/components/presentationals/period/PeriodLineGraph.vue';

export default {
  components: { PeriodLineGraph },
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
        ],
      },
    };
  },
};
</script>
