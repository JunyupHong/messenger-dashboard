<template>
  <DatePicker
    :type="type"
    v-model="dateValue"
    @changePeriod="onChangePeriod"
    @changeDate="onChangeDate"
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
      date: [new Date()],
    };
  },

  computed: {
    dateValue() {
      return this.type === 'period' ? this.period : this.date;
    },
  },

  methods: {
    onChangePeriod(newValue) {
      this.period = newValue;
    },
    onChangeDate(newValue) {
      this.date = newValue;
    },
  },
};
</script>

<style lang="scss" scoped></style>
