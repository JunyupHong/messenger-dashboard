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

<script lang="ts">
import Vue from 'vue';
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import PeriodOverview from '@/components/containers/period/PeriodOverview.vue';
import PeriodLineGraph from '@/components/containers/period/PeriodLineGraph.vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: { ContentsWrapper, DatePicker, PeriodOverview, PeriodLineGraph },
})
export default class Period extends Vue {}
</script>

<style lang="scss" scoped></style>
