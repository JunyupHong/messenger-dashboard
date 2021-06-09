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
            borderColor: this.legends[i].color,
            backgroundColor: this.legends[i].color,
            fill: false,
            tension: 0.1,
          }))
          .filter((_, i) => this.legends[i].active),
      };
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
