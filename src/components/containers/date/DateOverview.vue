<template>
  <DateOverview :firstDate="firstDate" :secondDate="secondDate" :barGraph="barGraph" />
</template>

<script>
import DateOverview from '@/components/presentationals/date/DateOverview.vue';
import { dateToString } from '@/utils/date.js';
import { mapState } from 'vuex';
import * as _ from 'lodash';

export default {
  components: { DateOverview },

  computed: {
    ...mapState({
      selectedDate(state) {
        return [state.date.firstSelectedDate, state.date.secondSelectedDate];
      },
      totalFirstDate(state) {
        return state.date.firstDate.reduce((acc, cur) => acc + cur.max_user, 0);
      },
      maxFirstDate(state) {
        return (
          _(state.date.firstDate)
            .groupBy(date => date.conn_hours)
            .map(date => date.reduce((acc, cur) => acc + cur.max_user, 0))
            .max() || 0
        );
      },
      totalSecondDate(state) {
        return state.date.secondDate.reduce((acc, cur) => acc + cur.max_user, 0);
      },
      maxSecondDate(state) {
        return (
          _(state.date.secondDate)
            .groupBy(date => date.conn_hours)
            .map(date => date.reduce((acc, cur) => acc + cur.max_user, 0))
            .max() || 0
        );
      },
      firstDateServers(state) {
        return _(state.date.firstDate)
          .groupBy(date => date.serverinfo_uid)
          .values()
          .value();
      },
      secondDateServers(state) {
        return _(state.date.secondDate)
          .groupBy(date => date.serverinfo_uid)
          .values()
          .value();
      },
    }),

    firstDate() {
      return {
        desc: dateToString(this.selectedDate[0], 'YYYY.MM.DD'),
        max: this.maxFirstDate,
        total: this.totalFirstDate,
      };
    },

    secondDate() {
      if (!this.selectedDate[1]) return null;

      return {
        desc: dateToString(this.selectedDate[1], 'YYYY.MM.DD'),
        max: this.maxSecondDate,
        total: this.totalSecondDate,
      };
    },

    barGraph() {
      const datasets = [
        {
          label: dateToString(this.selectedDate[0], 'YYYY.MM.DD'),
          backgroundColor: '#2E447F',
          data: this.firstDateServers.map(server =>
            server.reduce((acc, cur) => acc + cur.max_user, 0)
          ),
          barThickness: 16,
        },
      ];

      if (this.selectedDate[1]) {
        datasets.push({
          label: dateToString(this.selectedDate[1], 'YYYY.MM.DD'),
          data: this.secondDateServers.map(server =>
            server.reduce((acc, cur) => acc + cur.max_user, 0)
          ),
          backgroundColor: '#CF4F2E',
          barThickness: 16,
        });
      }

      return {
        labels: this.firstDateServers.map(server => server[0].server_ip),
        datasets,
      };
    },
  },
};
</script>
