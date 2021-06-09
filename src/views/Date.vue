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

export default {
  name: 'Date',
  components: { ContentsWrapper, DatePicker, DateOverview, DateLineGraph, DateLegendLineGraph },

  computed: {
    selectedFirstDate() {
      return dateToString(this.$store.state.date.firstSelectedDate, 'YYYY.MM.DD');
    },
    selectedSecondDate() {
      return dateToString(this.$store.state.date.secondSelectedDate, 'YYYY.MM.DD');
    },
  },
};
</script>

<style lang="scss" scoped></style>
