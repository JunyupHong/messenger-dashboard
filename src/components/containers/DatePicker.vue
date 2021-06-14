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
    ...mapState('date', {
      selectedDate(state) {
        return [state.firstSelectedDate, state.secondSelectedDate];
      },
    }),
  },

  methods: {
    ...mapMutations('period', ['changePeriod']),
    ...mapActions('period', ['fetchPeriod']),
    ...mapMutations('date', ['changeFirstDate', 'changeSecondDate']),
    ...mapActions('date', ['fetchFirstDate', 'fetchSecondDate']),
    async onChangePeriod({ newPeriod, prevPeriod }) {
      try {
        this.changePeriod(newPeriod);
        await this.fetchPeriod();
      } catch (e) {
        alert('해당 기간 데이터를 가져올 수 없습니다.');
        this.changePeriod(prevPeriod);
      }
    },
    async onChangeFirstDate({ newFirstDate, prevFirstDate }) {
      try {
        this.changeFirstDate(newFirstDate);
        await this.fetchFirstDate();
      } catch (e) {
        alert('해당 날짜 데이터를 가져올 수 없습니다.');
        this.changeFirstDate(prevFirstDate);
      }
    },
    async onChangeSecondDate({ newSecondDate, prevSecondDate }) {
      try {
        this.changeSecondDate(newSecondDate);
        await this.fetchSecondDate();
      } catch (e) {
        alert('해당 날짜 데이터를 가져올 수 없습니다.');
        this.changeSecondDate(prevSecondDate);
      }
    },
  },
  async mounted() {
    if (this.type === 'period') await this.fetchPeriod();
    else if (this.type === 'date') await this.fetchFirstDate();
  },
};
</script>

<style lang="scss" scoped></style>
