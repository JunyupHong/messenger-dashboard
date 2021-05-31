<template>
  <div>
    <DatePicker type="period"></DatePicker>
    <ContentsWrapper title="Overview">
      <PeriodOverview />
    </ContentsWrapper>
  </div>
</template>

<script>
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import PeriodOverview from '@/components/containers/period/PeriodOverview.vue';
export default {
  name: 'Period',
  components: { ContentsWrapper, DatePicker, PeriodOverview },
};
</script>

<style lang="scss" scoped></style>
