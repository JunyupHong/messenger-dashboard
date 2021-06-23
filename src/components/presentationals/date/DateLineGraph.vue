<template>
  <LineGraph :xLabel="xLabel" :yLabel="yLabel">
    <LineGraphChartjs v-if="true" class="linegraph__full" :chartData="chartData" />
    <LineGraphD3js v-else />
  </LineGraph>
</template>

<script>
import LineGraph from '@/components/presentationals/LineGraph.vue';
import LineGraphChartjs from '@/components/presentationals/graph/LineGraphChartjs.vue';
import LineGraphD3js from '@/components/presentationals/graph/LineGraphD3js.vue';

export default {
  props: {
    xLabel: String,
    yLabel: String,
    chartData: {
      type: Object,
      required: true,
    },
  },
  components: { LineGraph, LineGraphChartjs, LineGraphD3js },
};
</script>

<style lang="scss" scoped>
.linegraph__full {
  width: 100%;
}
</style>
