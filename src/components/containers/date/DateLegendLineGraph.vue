<template>
  <DateLegendLineGraph :xLabel="xLabel" :yLabel="yLabel" :legends="legends" :chartData="chart" />
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
  data() {
    return {
      chartData: {
        labels: Array.from({ length: 24 }).map((_, i) => i),
        datasets: [
          {
            label: '사내 (54)',
            fill: false,
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            tension: 0.1,
          },
          {
            label: '일반 (93)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            fill: false,
            tension: 0.1,
          },
          {
            label: '단독 (242)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            fill: false,
            tension: 0.1,
          },
          {
            label: '전용 (198)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            fill: false,
            tension: 0.1,
          },
          {
            label: '전옹 (88)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            fill: false,
            tension: 0.1,
          },
          {
            label: '전용 (97)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            fill: false,
            tension: 0.1,
          },
          {
            label: 'KBS (182)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            fill: false,
            tension: 0.1,
          },
        ],
      },
    };
  },
  computed: {
    chart() {
      return {
        ...this.chartData,
        datasets: this.chartData.datasets
          .map((dataset, i) => ({
            ...dataset,
            borderColor: this.legends[i].color,
            backgroundColor: this.legends[i].color,
          }))
          .filter((_, i) => this.legends[i].active),
      };
    },
  },
};
</script>
