<template>
  <DatePicker
    :type="type"
    v-model="dateValue"
    @changePeriod="onChangePeriod"
    @changeDate="onChangeDate"
  />
</template>

<script>
import DatePicker from '../presentationals/DatePicker.vue';
import a from '@/api';

export default {
  props: {
    type: String,
  },

  components: { DatePicker },

  data() {
    return {
      period: [new Date().getTime() - 3 * 60 * 60 * 24 * 1000, new Date()],
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
      console.log(a);
    },
    onChangeDate(newData) {
      this.date = newData;
    },
  },
};
</script>

<style lang="scss" scoped></style>
