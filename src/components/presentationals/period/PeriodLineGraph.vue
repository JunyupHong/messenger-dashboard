<template>
  <LineGraph :xLabel="xLabel" :yLabel="yLabel">
    <LineGraphChartjs class="linegraph__full" :chartData="chartData" />
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

<style lang="scss" scoped>
.linegraph__full {
  width: 100%;
}
</style>
