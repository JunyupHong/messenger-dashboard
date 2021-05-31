<template>
  <div>
    <DatePicker type="date"></DatePicker>
    <ContentsWrapper title="Overview">
      <DateOverview />
    </ContentsWrapper>
  </div>
</template>

<script>
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';
import DateOverview from '@/components/presentationals/date/DateOverview.vue';

export default {
  name: 'Date',
  components: { ContentsWrapper, DatePicker, DateOverview },
};
</script>

<style lang="scss" scoped></style>
