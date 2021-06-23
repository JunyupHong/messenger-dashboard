<template>
  <DateLegendLineGraph
    :xLabel="xLabel"
    :yLabel="yLabel"
    :legends="legends"
    :chartData="chart"
    @toggleLegend="toggleLegend"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import DateLegendLineGraph from '@/components/presentationals/date/DateLegendLineGraph.vue';
import { interpolateHSL } from '@/utils/color';
import { ChartData_T, Legend_T, Server_T } from '@/types';
import { MutationTypes } from '@/store/date/mutations';

@Component({
  components: { DateLegendLineGraph },
})
export default class DateLegendLineGraphContainer extends Vue {
  @Prop() xLabel?: string;
  @Prop() yLabel?: string;
  @Prop({ required: true }) legends!: Array<Legend_T>;
  @Prop({ required: true }) servers!: Server_T[][];
  @Prop({ required: true }) type!: string;

  get chart(): ChartData_T {
    return {
      labels: Array.from({ length: 24 }).map((_, i) => i),
      datasets: this.servers
        .map((server, i) => ({
          label: server[0].server_ip,
          data: server.map(time => time.max_user),
          borderColor: this.legends[i].color || 'none',
          backgroundColor: this.legends[i].color || 'none',
          fill: false,
          tension: 0.1,
        }))
        .filter((_, i) => this.legends[i].active),
    };
  }

  @Watch('servers')
  onChangeServers() {
    if (this.type === 'first') {
      this.$store.commit(MutationTypes.CHANGE_FIRST_DATE_LEGENDS, this.getInitLegends());
    } else {
      this.$store.commit(MutationTypes.CHANGE_SECOND_DATE_LEGENDS, this.getInitLegends());
    }
  }

  toggleLegend(legend: Legend_T) {
    if (this.type === 'first') {
      this.$store.commit(MutationTypes.TOGGLE_FIRST_DATE_LEGENDS, legend);
    } else {
      this.$store.commit(MutationTypes.TOGGLE_SECOND_DATE_LEGENDS, legend);
    }
  }

  getInitLegends() {
    if (this.servers.length === 0) return [];

    const colors =
      this.type === 'first'
        ? interpolateHSL(160, 290, this.servers.length, 100, 38).reverse()
        : interpolateHSL(0, 70, this.servers.length, 100, 45);

    return this.servers.map((server, i) => ({
      name: server[0].server_ip,
      color: `hsl(${colors[i].h}, ${colors[i].s}%, ${colors[i].l}%)`,
    }));
  }
}
</script>
