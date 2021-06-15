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
      const fetchPeriod = async () => {
        try {
          this.$loading.on();
          this.changePeriod(newPeriod);
          await this.fetchPeriod();
          return Promise.resolve();
        } catch (e) {
          alert('해당 기간 데이터를 가져올 수 없습니다.');
          this.changePeriod(prevPeriod);
          return Promise.reject();
        }
      };
      await Promise.allSettled([
        fetchPeriod(),
        new Promise(resolve => setTimeout(() => resolve(), 500)),
      ]);
      this.$loading.off();
    },

    async onChangeFirstDate({ newFirstDate, prevFirstDate }) {
      const fetchDate = async () => {
        try {
          this.$loading.on();
          this.changeFirstDate(newFirstDate);
          await this.fetchFirstDate();
        } catch (e) {
          alert('해당 날짜 데이터를 가져올 수 없습니다.');
          this.changeFirstDate(prevFirstDate);
        }
      };

      await Promise.allSettled([
        fetchDate(),
        new Promise(resolve => setTimeout(() => resolve(), 500)),
      ]);
      this.$loading.off();
    },

    async onChangeSecondDate({ newSecondDate, prevSecondDate }) {
      const fetchDate = async () => {
        try {
          this.$loading.on();
          this.changeSecondDate(newSecondDate);
          await this.fetchSecondDate();
        } catch (e) {
          alert('해당 날짜 데이터를 가져올 수 없습니다.');
          this.changeSecondDate(prevSecondDate);
        }
      };

      await Promise.allSettled([
        fetchDate(),
        new Promise(resolve => setTimeout(() => resolve(), 500)),
      ]);
      this.$loading.off();
    },
  },
  async mounted() {
    if (this.type === 'period') await this.fetchPeriod();
    else if (this.type === 'date') await this.fetchFirstDate();
  },
};
</script>

<style lang="scss" scoped></style>
