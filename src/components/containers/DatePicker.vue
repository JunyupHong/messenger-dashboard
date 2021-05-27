<template>
  <DatePicker
    :type="type"
    v-model="dateValue"
    @changePeriod="changePeriod"
    @changeDate="changeDate"
  />
</template>

<script>
import DatePicker from '../presentationals/DatePicker';
export default {
  props: {
    type: String,
  },
  components: { DatePicker },
  data() {
    return {
      period: [new Date(), new Date()],
      date: [new Date(), 20200101],
      changePeriod: (newValue) => (this.period = newValue),
      changeDate: (newValue) => (this.date = newValue),
    };
  },
  computed: {
    dateValue() {
      return this.type === 'period' ? this.period : this.date;
    },
  },
};
</script>

<style lang="scss" scoped></style>
