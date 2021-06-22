<template>
  <DateOverview :firstDate="firstDate" :secondDate="secondDate" :barGraph="barGraph" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import DateOverview from '@/components/presentationals/date/DateOverview.vue';
import { dateToString } from '@/utils/date';
import flow from 'lodash/flow';
import groupBy from 'lodash/groupBy';
import union from 'lodash/union';
import { Server_T } from '@/types';

@Component({
  components: { DateOverview },
})
export default class DateOverviewContainer extends Vue {
  get selectedDate() {
    return [this.$store.state.date.firstSelectedDate, this.$store.state.date.secondSelectedDate];
  }
  get totalFirstDate() {
    return this.$store.state.date.firstDate.reduce(
      (acc: number, cur: Server_T) => acc + cur.max_user,
      0
    );
  }
  get maxFirstDate() {
    return this.getMaxUserByTime(this.$store.state.date.firstDate);
  }
  get totalSecondDate() {
    return this.$store.state.date.secondDate.reduce(
      (acc: number, cur: Server_T) => acc + cur.max_user,
      0
    );
  }
  get maxSecondDate() {
    return this.getMaxUserByTime(this.$store.state.date.secondDate);
  }
  get firstDateServers() {
    return this.getDateByServer(this.$store.state.date.firstDate);
  }
  get secondDateServers() {
    return this.getDateByServer(this.$store.state.date.secondDate);
  }

  get firstDate() {
    return {
      desc: dateToString(this.selectedDate[0] as Date, 'YYYY.MM.DD'),
      max: this.maxFirstDate,
      total: this.totalFirstDate,
    };
  }

  get secondDate() {
    if (!this.selectedDate[1]) return null;

    return {
      desc: dateToString(this.selectedDate[1], 'YYYY.MM.DD'),
      max: this.maxSecondDate,
      total: this.totalSecondDate,
    };
  }

  get barGraph() {
    let labels = this.firstDateServers.map(server => server[0].server_ip);
    if (this.selectedDate[1]) {
      labels = union(
        labels,
        this.secondDateServers.map(server => server[0].server_ip)
      );
    }

    const datasets = [
      {
        label: dateToString(this.selectedDate[0] as Date, 'YYYY.MM.DD'),
        backgroundColor: '#2E447F',
        data: this.firstDateServers.map(server =>
          server.reduce((acc: number, cur: Server_T) => acc + cur.max_user, 0)
        ),
        barThickness: 16,
      },
    ];

    if (this.selectedDate[1]) {
      datasets.push({
        label: dateToString(this.selectedDate[1], 'YYYY.MM.DD'),
        data: labels.map(serverName => {
          const idx = this.secondDateServers.map(server => server[0].server_ip).indexOf(serverName);

          if (idx === -1) return 0;
          return this.secondDateServers[idx].reduce(
            (acc: number, cur: Server_T) => acc + cur.max_user,
            0
          );
        }),
        backgroundColor: '#CF4F2E',
        barThickness: 16,
      });
    }

    return {
      labels,
      datasets,
    };
  }

  getMaxUserByTime(dateData: Array<Server_T>) {
    return flow(
      date => groupBy(date, hour => hour.conn_hours),
      Object.values,
      date => date.map(hour => hour.reduce((acc: number, cur: Server_T) => acc + cur.max_user, 0)),
      counts => (counts.length > 0 ? Math.max(...counts) : 0)
    )(dateData);
  }

  getDateByServer(dateData: Array<Server_T>) {
    return flow(date => groupBy(date, server => server.serverinfo_uid), Object.values)(dateData);
  }
}
</script>
