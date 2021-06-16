<template>
  <DateOverview :firstDate="firstDate" :secondDate="secondDate" :barGraph="barGraph" />
</template>

<script>
import DateOverview from '@/components/presentationals/date/DateOverview.vue';
import { dateToString } from '@/utils/date.js';
import { mapState } from 'vuex';
import flow from 'lodash/flow';
import groupBy from 'lodash/groupBy';
import union from 'lodash/union';

export default {
  components: { DateOverview },

  computed: {
    ...mapState('date', {
      selectedDate(state) {
        return [state.firstSelectedDate, state.secondSelectedDate];
      },
      totalFirstDate(state) {
        return state.firstDate.reduce((acc, cur) => acc + cur.max_user, 0);
      },
      maxFirstDate(state) {
        return this.getMaxUserByTime(state.firstDate);
      },
      totalSecondDate(state) {
        return state.secondDate.reduce((acc, cur) => acc + cur.max_user, 0);
      },
      maxSecondDate(state) {
        return this.getMaxUserByTime(state.secondDate);
      },
      firstDateServers(state) {
        return this.getDateByServer(state.firstDate);
      },
      secondDateServers(state) {
        return this.getDateByServer(state.secondDate);
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
      let labels = this.firstDateServers.map(server => server[0].server_ip);
      if (this.selectedDate[1]) {
        labels = union(
          labels,
          this.secondDateServers.map(server => server[0].server_ip)
        );
      }

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
          data: labels.map(serverName => {
            const idx = this.secondDateServers
              .map(server => server[0].server_ip)
              .indexOf(serverName);

            if (idx === -1) return 0;
            return this.secondDateServers[idx].reduce((acc, cur) => acc + cur.max_user, 0);
          }),
          backgroundColor: '#CF4F2E',
          barThickness: 16,
        });
      }

      return {
        labels,
        datasets,
      };
    },
  },

  methods: {
    getMaxUserByTime(dateData) {
      return flow(
        date => groupBy(date, hour => hour.conn_hours),
        Object.values,
        date => date.map(hour => hour.reduce((acc, cur) => acc + cur.max_user, 0)),
        counts => (counts.length > 0 ? Math.max(...counts) : 0)
      )(dateData);
    },

    getDateByServer(dateData) {
      return flow(date => groupBy(date, server => server.serverinfo_uid), Object.values)(dateData);
    },
  },
};
</script>
