<template>
  <DateLineGraph :chartData="chartData" :xLabel="xLabel" :yLabel="yLabel" />
</template>

<script lang="ts">
import Vue from 'vue';
import DateLineGraph from '@/components/presentationals/date/DateLineGraph.vue';
import { dateToString } from '@/utils/date';
import flow from 'lodash/flow';
import groupBy from 'lodash/groupBy';
import { Component, Prop } from 'vue-property-decorator';
import { Server_T } from '@/types';

@Component({
  components: { DateLineGraph },
})
export default class DateLineGraphContainer extends Vue {
  @Prop() xLabel?: string;
  @Prop() yLabel?: string;

  get selectedDate(): [Date, Date | undefined] {
    return [this.$store.state.date.firstSelectedDate, this.$store.state.date.secondSelectedDate];
  }

  get firstDateByTimes() {
    return this.dateByTimes(this.$store.state.date.firstDate);
  }
  get secondDateByTimes() {
    return this.dateByTimes(this.$store.state.date.secondDate);
  }

  get chartData() {
    const datasets = [
      {
        label: dateToString(this.selectedDate[0], 'YYYY.MM.DD'),
        borderColor: '#2E447F',
        backgroundColor: '#2E447F',
        fill: false,
        data: this.firstDateByTimes.map(time =>
          time.reduce((acc: number, cur: Server_T) => acc + cur.max_user, 0)
        ),
        tension: 0.1,
      },
    ];

    if (this.selectedDate[1]) {
      datasets.push({
        label: dateToString(this.selectedDate[1], 'YYYY.MM.DD'),
        data: this.secondDateByTimes.map(time =>
          time.reduce((acc: number, cur: Server_T) => acc + cur.max_user, 0)
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
  }

  dateByTimes(dateData: Array<Server_T>): Array<Array<Server_T>> {
    return flow(date => groupBy(date, hour => hour.conn_hours), Object.values)(dateData);
  }
}
</script>
