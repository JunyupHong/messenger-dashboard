<template>
  <div>
    <DatePicker type="period" />
    <ContentsWrapper title="Overview">
      <PeriodOverview />
    </ContentsWrapper>
    <ContentsWrapper title="동시 접속자 수 변화">
      <PeriodLineGraph />
    </ContentsWrapper>
  </div>
</template>

<script>
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import PeriodOverview from '@/components/containers/period/PeriodOverview.vue';
import PeriodLineGraph from '@/components/presentationals/period/PeriodLineGraph.vue';

export default {
  name: 'Period',
  components: { ContentsWrapper, DatePicker, PeriodOverview, PeriodLineGraph },
};
</script>

<style lang="scss" scoped></style>
