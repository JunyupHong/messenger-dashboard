<template>
  <DateLineGraph :chartData="chartData" :xLabel="xLabel" :yLabel="yLabel" />
</template>

<script>
import DateLineGraph from '@/components/presentationals/date/DateLineGraph.vue';
import { dateToString } from '@/utils/date.js';
import { mapState } from 'vuex';
import * as _ from 'lodash';

export default {
  props: {
    xLabel: String,
    yLabel: String,
  },

  components: { DateLineGraph },

  computed: {
    ...mapState({
      selectedDate(state) {
        return [state.date.firstSelectedDate, state.date.secondSelectedDate];
      },

      firstDateByTimes(state) {
        return _(state.date.firstDate)
          .groupBy(date => date.conn_hours)
          .values()
          .value();
      },

      secondDateByTimes(state) {
        return _(state.date.secondDate)
          .groupBy(date => date.conn_hours)
          .values()
          .value();
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

  mounted() {},
};
</script>
