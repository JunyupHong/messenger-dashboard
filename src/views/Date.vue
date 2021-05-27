<template>
  <div>
    <DatePicker type="date"></DatePicker>
    <ContentWrapper title="Overview"> template </ContentWrapper>
  </div>
</template>

<script>
import ContentWrapper from '@/components/presentationals/ContentWrapper.vue';
import DatePicker from '@/components/presentationals/DatePicker.vue';

export default {
  name: 'Date',
  components: { ContentWrapper, DatePicker },
};
</script>

<style lang="scss" scoped></style>
