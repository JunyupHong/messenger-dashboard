<template>
  <DatePicker
    :type="type"
    :dateValue="dateValue"
    @changePeriod="onChangePeriod"
    @changeFirstDate="onChangeFirstDate"
    @changeSecondDate="onChangeSecondDate"
  />
</template>

<script>
import DatePicker from '../presentationals/DatePicker.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    type: String,
  },

  components: { DatePicker },

  computed: {
    ...mapState('period', {
      dateValue(state) {
        return this.type === 'period' ? state.selectedPeriod : this.selectedDate;
      },
    }),
    ...mapState({
      selectedDate(state) {
        return [state.date.firstSelectedDate, state.date.secondSelectedDate];
      },
    }),
  },

  methods: {
    ...mapMutations('period', ['changePeriod']),
    ...mapActions('period', ['fetchPeriod']),
    ...mapMutations('date', ['changeFirstDate', 'changeSecondDate']),
    ...mapActions('date', ['fetchFirstDate', 'fetchSecondDate']),
    async onChangePeriod(newPeriod) {
      this.changePeriod(newPeriod);
      await this.fetchPeriod();
    },
    async onChangeFirstDate(newDate) {
      this.changeFirstDate(newDate);
      await this.fetchFirstDate();
    },
    async onChangeSecondDate(newDate) {
      this.changeSecondDate(newDate);
      await this.fetchSecondDate();
    },
  },
  async mounted() {
    if (this.type === 'period') await this.fetchPeriod();
    else if (this.type === 'date') await this.fetchFirstDate();
  },
};
</script>

<style lang="scss" scoped></style>
