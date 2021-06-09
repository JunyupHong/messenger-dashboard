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

<script>
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import DateOverview from '@/components/containers/date/DateOverview.vue';
import DateLineGraph from '@/components/containers/date/DateLineGraph.vue';
import DateLegendLineGraph from '@/components/containers/date/DateLegendLineGraph.vue';
import { dateToString } from '@/utils/date.js';
import flow from 'lodash/flow';
import groupBy from 'lodash/groupBy';
import { mapState } from 'vuex';

export default {
  name: 'Date',
  components: { ContentsWrapper, DatePicker, DateOverview, DateLineGraph, DateLegendLineGraph },

  methods: {
    dateByServer(dateData) {
      return flow(date => groupBy(date, server => server.serverinfo_uid), Object.values)(dateData);
    },
  },

  computed: {
    ...mapState('date', {
      firstDateLegends: 'firstDateLegends',
      secondDateLegends: 'secondDateLegends',
      firstSelectedDate: state => state.firstSelectedDate,
      secondSelectedDate: state => state.secondSelectedDate,

      firstDateServer(state) {
        return this.dateByServer(state.firstDate);
      },

      secondDateServer(state) {
        return this.dateByServer(state.secondDate);
      },
    }),

    selectedFirstDate() {
      return dateToString(this.firstSelectedDate, 'YYYY.MM.DD');
    },

    selectedSecondDate() {
      return dateToString(this.secondSelectedDate, 'YYYY.MM.DD');
    },
  },
};
</script>

<style lang="scss" scoped></style>
