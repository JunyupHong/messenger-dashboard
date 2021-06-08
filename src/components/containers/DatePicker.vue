<template>
  <DatePicker
    :type="type"
    :dateValue="dateValue"
    @changePeriod="onChangePeriod"
    @changeDate="onChangeDate"
  />
</template>

<script>
import DatePicker from '../presentationals/DatePicker.vue';
import { mapState } from 'vuex';

export default {
  props: {
    type: String,
  },

  components: { DatePicker },

  computed: mapState({
    dateValue(state) {
      return this.type === 'period'
        ? state.period.selectedPeriod
        : [state.date.firstDate, state.date.secondDate];
    },
  }),

  methods: {
    async onChangePeriod(newPeriod) {
      this.$store.commit({ type: 'changePeriod', period: newPeriod });
      await this.$store.dispatch('fetchPeriod');
    },
    onChangeDate(newDate) {
      this.$store.commit({ type: 'changeDate', date: newDate });
    },
  },
  async mounted() {
    if (this.type === 'period') await this.$store.dispatch('fetchPeriod');
    else if (this.type === 'date') console.log('fetch date');
  },
};
</script>

<style lang="scss" scoped></style>
