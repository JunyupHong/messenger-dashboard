<template>
  <div>
    <DatePicker type="date" />
    <ContentsWrapper title="Overview">
      <DateOverview />
    </ContentsWrapper>
    <ContentsWrapper title="동시 접속자 수 변화">
      <DateLineGraph xLabel="시간" yLabel="동시 접속자 수" />
    </ContentsWrapper>
    <ContentsWrapper title="서버 별 동시 접속자 수 변화 - 2021.05.16">
      <DateLegendLineGraph xLabel="시간" yLabel="동시 접속자 수" :legends="firstDateLegends" />
    </ContentsWrapper>
    <ContentsWrapper title="서버 별 동시 접속자 수 변화 - 2021.05.18">
      <DateLegendLineGraph xLabel="시간" yLabel="동시 접속자 수" :legends="secondDateLegends" />
    </ContentsWrapper>
  </div>
</template>

<script>
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import DateOverview from '@/components/containers/date/DateOverview.vue';
import DateLineGraph from '@/components/presentationals/date/DateLineGraph.vue';
import DateLegendLineGraph from '@/components/presentationals/date/DateLegendLineGraph.vue';

export default {
  name: 'Date',
  components: { ContentsWrapper, DatePicker, DateOverview, DateLineGraph, DateLegendLineGraph },
  data() {
    return {
      firstDateLegends: [
        { color: '#00519E', name: '사내 (54)', active: true },
        { color: '#2E447F', name: '일반 (93)', active: true },
        { color: '#1D7ABD', name: '단독 (242)', active: true },
        { color: '#89C6E1', name: '전용 (198)', active: true },
        { color: '#90BEDE', name: '전옹 (88)', active: false },
        { color: '#000000', name: '전용 (97)', active: true },
        { color: '#cccccc', name: 'KBS (182)', active: false },
      ],
      secondDateLegends: [
        { color: '#E75113', name: '사내 (54)', active: true },
        { color: '#F9B200', name: '일반 (93)', active: true },
        { color: '#E7823F', name: '단독 (242)', active: true },
        { color: '#CF4F2E', name: '전용 (198)', active: true },
        { color: '#EA7D24', name: '전옹 (88)', active: false },
        { color: '#000000', name: '전용 (97)', active: true },
        { color: '#cccccc', name: 'KBS (182)', active: false },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
