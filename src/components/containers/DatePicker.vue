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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  props: {
    type: String,
  },

  components: { DatePicker },

  computed: {
    ...mapState({
      dateValue(state) {
        return this.type === 'period' ? state.period.selectedPeriod : this.selectedDate;
      },
    }),
    ...mapGetters(['selectedDate']),
  },

  methods: {
    ...mapMutations(['changePeriod', 'changeFirstDate', 'changeSecondDate']),
    ...mapActions(['fetchPeriod', 'fetchFirstDate', 'fetchSecondDate']),
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
