<template>
  <LineGraph :xLabel="xLabel" :yLabel="yLabel">
    <LineGraphChartjs class="linegraph__full" :chartData="chartData" />
  </LineGraph>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import LineGraph from '@/components/presentationals/LineGraph.vue';
import LineGraphChartjs from '@/components/presentationals/graph/LineGraphChartjs.vue';

@Component({
  components: { LineGraph, LineGraphChartjs },
})
export default class PeriodLineGraph extends Vue {
  @Prop() private xLabel?: string;
  @Prop() private yLabel?: string;

  @Prop({ required: true }) private chartData!: Object;
}
</script>

<style lang="scss" scoped>
.linegraph__full {
  width: 100%;
}
</style>
