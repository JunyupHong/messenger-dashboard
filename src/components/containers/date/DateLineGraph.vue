<template>
  <DateLineGraph :chartData="chartData" :xLabel="xLabel" :yLabel="yLabel" />
</template>

<script>
import DateLineGraph from '@/components/presentationals/date/DateLineGraph.vue';
import { dateToString } from '@/utils/date.js';
import { mapState } from 'vuex';
import flow from 'lodash/flow';
import groupBy from 'lodash/groupBy';

export default {
  props: {
    xLabel: String,
    yLabel: String,
  },

  components: { DateLineGraph },

  methods: {
    dateByTimes(dateData) {
      return flow(date => groupBy(date, hour => hour.conn_hours), Object.values)(dateData);
    },
  },

  computed: {
    ...mapState({
      selectedDate: state => [state.date.firstSelectedDate, state.date.secondSelectedDate],

      firstDateByTimes(state) {
        return this.dateByTimes(state.date.firstDate);
      },
      secondDateByTimes(state) {
        return this.dateByTimes(state.date.secondDate);
      },
    }),

    chartData() {
      const datasets = [
        {
          label: dateToString(this.selectedDate[0], 'YYYY.MM.DD'),
          borderColor: '#2E447F',
          backgroundColor: '#2E447F',
          fill: false,
          data: this.firstDateByTimes.map(time => time.reduce((acc, cur) => acc + cur.max_user, 0)),
          tension: 0.1,
        },
      ];

      if (this.selectedDate[1]) {
        datasets.push({
          label: dateToString(this.selectedDate[1], 'YYYY.MM.DD'),
          data: this.secondDateByTimes.map(time =>
            time.reduce((acc, cur) => acc + cur.max_user, 0)
          ),
          borderColor: '#CF4F2E',
          backgroundColor: '#CF4F2E',
          fill: false,
          tension: 0.1,
        });
      }

      return {
        labels: Array.from({ length: 24 }).map((_, i) => i),
        datasets,
      };
    },
  },
};
</script>
