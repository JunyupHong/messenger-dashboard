<template>
  <div>
    <DatePicker type="period"></DatePicker>
    <ContentWrapper title="Overview"> template </ContentWrapper>
  </div>
</template>

<script>
import ContentWrapper from '@/components/presentationals/ContentWrapper.vue';
import DatePicker from '@/components/presentationals/DatePicker.vue';

export default {
  name: 'Period',
  components: { ContentWrapper, DatePicker },
};
</script>

<style lang="scss" scoped></style>
