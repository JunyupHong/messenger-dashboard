<template>
  <DateLegendLineGraph
    :xLabel="xLabel"
    :yLabel="yLabel"
    :legends="legends"
    :chartData="chart"
    @toggleLegend="toggleLegend"
  />
</template>

<script>
import DateLegendLineGraph from '@/components/presentationals/date/DateLegendLineGraph';
import { mapMutations } from 'vuex';
import { interpolateHSL } from '@/utils/color.js';

export default {
  props: {
    xLabel: String,
    yLabel: String,
    legends: {
      type: Array,
      required: true,
    },
    servers: {
      type: Array,
      required: true,
    },
    type: String,
  },

  components: { DateLegendLineGraph },

  computed: {
    chart() {
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
    },
  },

  watch: {
    servers: function () {
      if (this.type === 'first') {
        this.changeFirstDateLegends(this.getInitLegends());
      } else {
        this.changeSecondDateLegends(this.getInitLegends());
      }
    },
  },

  methods: {
    ...mapMutations('date', [
      'changeFirstDateLegends',
      'changeSecondDateLegends',
      'toggleFirstDateLegend',
      'toggleSecondDateLegend',
    ]),

    toggleLegend(legend) {
      if (this.type === 'first') {
        this.toggleFirstDateLegend({ legend });
      } else {
        this.toggleSecondDateLegend({ legend });
      }
    },

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
    },
  },
};
</script>
