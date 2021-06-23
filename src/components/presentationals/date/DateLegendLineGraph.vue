<template>
  <section class="legend-linegraph">
    <article class="legend">
      <div
        class="legend__item"
        v-for="(legend, i) in legends"
        :key="`legend-${i}-${legend.color}`"
        @click="() => onClickLegend(legend)"
      >
        <span
          class="legend__color"
          :style="{
            background: legend.active ? legend.color : 'none',
            borderColor: legend.color,
          }"
        ></span>
        <span> {{ legend.name }}</span>
      </div>
    </article>
    <article class="linegraph">
      <LineGraph :xLabel="xLabel" :yLabel="yLabel">
        <LineGraphChartjs class="linegraph__full" :chartData="chartData" />
      </LineGraph>
    </article>
  </section>
</template>

<script lang="ts">
import LineGraph from '@/components/presentationals/LineGraph.vue';
import LineGraphChartjs from '@/components/presentationals/graph/LineGraphChartjs.vue';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ChartData_T, Legend_T } from '@/types';

@Component({
  components: { LineGraph, LineGraphChartjs },
})
export default class DateLegendLineGraph extends Vue {
  @Prop() xLabel?: string;
  @Prop() yLabel?: string;
  @Prop({ required: true }) legends!: Array<Legend_T>;
  @Prop({ required: true }) chartData!: ChartData_T;

  onClickLegend(legend: Legend_T) {
    this.$emit('toggleLegend', legend);
  }
}
</script>

<style lang="scss" scoped>
.legend-linegraph {
  display: flex;
}

.legend {
  margin-right: 24px;
  border: solid 1px color.$black-4;
  padding: 12px 24px;
  &__item {
    margin: 12px 0;
    color: color.$black-1;
    font-size: font.$small;
    font-weight: font.$medium;
    white-space: nowrap;
    &:hover {
      cursor: pointer;
    }
  }
  &__color {
    display: inline-block;
    border: solid 2px;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    &[isActive] {
      background: none;
    }
  }
}

.linegraph {
  flex: 1;
  &__full {
    width: 100%;
  }
}
</style>
