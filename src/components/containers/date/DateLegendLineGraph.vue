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
      color: {
        first: ['#2E447F', '#00519E', '#1D7ABD', '#90BEDE', '#89C6E1', '#444444', '#aaaaaa'],
        second: ['#CF4F2E', '#E75113', '#EA7D24', '#E7823F', '#F9B200', '#444444', '#aaaaaa'],
      },
      chartData: {
        labels: Array.from({ length: 24 }).map((_, i) => i),
        datasets: [
          {
            label: '사내 (54)',
            borderColor: '#2E447F',
            fill: false,
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            tension: 0.1,
          },
          {
            label: '일반 (93)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            borderColor: '#00519E',
            fill: false,
            tension: 0.1,
          },
          {
            label: '단독 (242)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            borderColor: '#1D7ABD',
            fill: false,
            tension: 0.1,
          },
          {
            label: '전용 (198)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            borderColor: '#90BEDE',
            fill: false,
            tension: 0.1,
          },
          {
            label: '전옹 (88)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            borderColor: '#89C6E1',
            fill: false,
            tension: 0.1,
          },
          {
            label: '전용 (97)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            borderColor: '#444',
            fill: false,
            tension: 0.1,
          },
          {
            label: 'KBS (182)',
            data: Array.from({ length: 24 }).map(() => Math.round(Math.random() * 100)),
            borderColor: '#aaa',
            fill: false,
            tension: 0.1,
          },
        ],
      },
    };
  },
  computed: {
    chart() {
      if (this.type === 'first') {
        return {
          ...this.chartData,
          datasets: this.chartData.datasets.filter((_, i) => this.legends[i].active),
        };
      }
      return {
        ...this.chartData,
        datasets: this.chartData.datasets
          .map((dataset, i) => ({ ...dataset, borderColor: this.color.second[i] }))
          .filter((_, i) => this.legends[i].active),
      };
    },
  },
};
</script>
