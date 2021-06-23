<template>
  <div>
    <DatePicker type="date" />
    <ContentsWrapper title="Overview">
      <DateOverview />
    </ContentsWrapper>
    <ContentsWrapper title="동시 접속자 수 변화">
      <DateLineGraph xLabel="시간" yLabel="동시 접속자 수" />
    </ContentsWrapper>
    <ContentsWrapper :title="`서버 별 동시 접속자 수 변화 - ${selectedFirstDate}`">
      <DateLegendLineGraph
        xLabel="시간"
        yLabel="동시 접속자 수"
        :legends="firstDateLegends"
        :servers="firstDateServer"
        type="first"
      />
    </ContentsWrapper>
    <ContentsWrapper
      v-if="secondSelectedDate"
      :title="`서버 별 동시 접속자 수 변화 - ${selectedSecondDate}`"
    >
      <DateLegendLineGraph
        xLabel="시간"
        yLabel="동시 접속자 수"
        :legends="secondDateLegends"
        :servers="secondDateServer"
        type="second"
      />
    </ContentsWrapper>
  </div>
</template>

<script lang="ts">
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import DateOverview from '@/components/containers/date/DateOverview.vue';
import DateLineGraph from '@/components/containers/date/DateLineGraph.vue';
import DateLegendLineGraph from '@/components/containers/date/DateLegendLineGraph.vue';
import flow from 'lodash/flow';
import groupBy from 'lodash/groupBy';

import { dateToString } from '@/utils/date';
import { Server_T } from '@/types/';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    ContentsWrapper,
    DatePicker,
    DateOverview,
    DateLineGraph,
    DateLegendLineGraph,
  },
})
export default class Date extends Vue {
  get firstDateLegends() {
    return this.$store.state.date.firstDateLegends;
  }

  get secondDateLegends() {
    return this.$store.state.date.secondDateLegends;
  }

  get firstSelectedDate() {
    return this.$store.state.date.firstSelectedDate;
  }

  get secondSelectedDate() {
    return this.$store.state.date.secondSelectedDate;
  }

  get selectedFirstDate() {
    return dateToString(this.firstSelectedDate, 'YYYY.MM.DD');
  }

  get selectedSecondDate() {
    if (!this.secondSelectedDate) return '';
    return dateToString(this.secondSelectedDate, 'YYYY.MM.DD');
  }

  get firstDateServer() {
    return this.dateByServer(this.$store.state.date.firstDate);
  }

  get secondDateServer() {
    return this.dateByServer(this.$store.state.date.secondDate);
  }

  dateByServer(dateData: Array<Server_T>): Array<Array<Server_T>> {
    return flow(date => groupBy(date, server => server.serverinfo_uid), Object.values)(dateData);
  }
}
</script>

<style lang="scss" scoped></style>
