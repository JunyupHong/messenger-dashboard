<template>
  <div>
    <DatePicker type="date"></DatePicker>
    <ContentsWrapper title="Overview"> template </ContentsWrapper>
  </div>
</template>

<script>
import ContentsWrapper from '@/components/presentationals/ContentsWrapper.vue';
import DatePicker from '@/components/containers/DatePicker.vue';

export default {
  name: 'Date',
  components: { ContentsWrapper, DatePicker },
};
</script>

<style lang="scss" scoped></style>
