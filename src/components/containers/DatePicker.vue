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
    onChangePeriod(newPeriod) {
      this.period = newPeriod;
    },
    onChangeDate(newData) {
      this.date = newData;
    },
  },
};
</script>

<style lang="scss" scoped></style>
