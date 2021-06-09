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
        :legends="this.$store.state.date.firstDateLegends"
        :servers="firstDateServer"
        type="first"
      />
    </ContentsWrapper>
    <ContentsWrapper
      v-if="this.$store.state.date.secondSelectedDate"
      :title="`서버 별 동시 접속자 수 변화 - ${selectedSecondDate}`"
    >
      <DateLegendLineGraph
        xLabel="시간"
        yLabel="동시 접속자 수"
        :legends="this.$store.state.date.secondDateLegends"
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
import * as _ from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'Date',
  components: { ContentsWrapper, DatePicker, DateOverview, DateLineGraph, DateLegendLineGraph },

  computed: {
    ...mapState({
      firstSelectedDate: state => state.date.firstSelectedDate,
      secondSelectedDate: state => state.date.secondSelectedDate,

      firstDateServer(state) {
        return _(state.date.firstDate)
          .groupBy(date => date.serverinfo_uid)
          .values()
          .value();
      },

      secondDateServer(state) {
        return _(state.date.secondDate)
          .groupBy(date => date.serverinfo_uid)
          .values()
          .value();
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
