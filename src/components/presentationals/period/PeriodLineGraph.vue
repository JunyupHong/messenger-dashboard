<template>
  <LineGraph xLabel="날짜" yLabel="동시 접속자 수">
    <LineGraphChartjs :chartData="chartData" :style="{ width: '100%' }" />
  </LineGraph>
</template>

<script>
import LineGraph from '@/components/presentationals/LineGraph.vue';
import LineGraphChartjs from '@/components/presentationals/graph/LineGraphChartjs.vue';

export default {
  props: {
    xLabel: String,
    yLabel: String,
    chartData: {
      type: Object,
      required: true,
    },
  },
  components: { LineGraph, LineGraphChartjs },
};
</script>
<style lang="scss" scoped></style>
