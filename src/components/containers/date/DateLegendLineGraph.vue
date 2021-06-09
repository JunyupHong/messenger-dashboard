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

export default {
  props: {
    xLabel: String,
    yLabel: String,
    legends: {
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
          .map((dataset, i) => ({
            ...dataset,
            borderColor: this.$store.state.date[`${this.type}DateLegends`][i].color,
            backgroundColor: this.$store.state.date[`${this.type}DateLegends`][i].color,
            fill: false,
            tension: 0.1,
          }))
          .filter((_, i) => this.$store.state.date[`${this.type}DateLegends`][i].active),
      };
    },
    servers() {
      if (this.type === 'first') {
        return this.$store.getters.firstDateServers.map(server => ({
          label: server[0].server_ip,
          data: server.map(time => time.max_user),
        }));
      } else {
        return this.$store.getters.secondDateServers.map(server => ({
          label: server[0].server_ip,
          data: server.map(time => time.max_user),
        }));
      }
    },
  },
  methods: {
    toggleLegend(legend) {
      if (this.type === 'first') {
        this.$store.commit({ type: 'toggleFirstDateLegend', legend });
      } else {
        this.$store.commit({ type: 'toggleSecondDateLegend', legend });
      }
    },
  },
};
</script>
