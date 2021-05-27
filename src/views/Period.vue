<template>
  <div>
    <DatePicker type="period"></DatePicker>
    <ContentWrapper title="Overview">
      <PeriodOverview />
    </ContentWrapper>
  </div>
</template>

<script>
import ContentWrapper from '@/components/presentationals/ContentWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import PeriodOverview from '@/components/containers/period/PeriodOverview.vue';
export default {
  name: 'Period',
  components: { ContentWrapper, DatePicker, PeriodOverview },
};
</script>

<style lang="scss" scoped></style>
