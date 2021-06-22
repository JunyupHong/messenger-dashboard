<template>
  <DatePicker
    :type="type"
    :dateValue="dateValue"
    @changePeriod="onChangePeriod"
    @changeFirstDate="onChangeFirstDate"
    @changeSecondDate="onChangeSecondDate"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import DatePicker from '../presentationals/DatePicker.vue';
import { ActionTypes as DateActionTypes } from '@/store/date/actions';
import { MutationTypes as DateMutationTypes } from '@/store/date/mutations';
import { ActionTypes as PeriodActionTypes } from '@/store/period/actions';
import { MutationTypes as PeriodMutationTypes } from '@/store/period/mutations';

@Component({
  components: { DatePicker },
})
export default class DatePickerContainer extends Vue {
  @Prop({ required: true }) type!: 'period' | 'date';

  get dateValue() {
    return this.type === 'period'
      ? this.$store.state.period.selectedPeriod
      : [this.$store.state.date.firstSelectedDate, this.$store.state.date.secondSelectedDate];
  }

  changePeriod(newPeriod: [Date, Date]) {
    this.$store.commit(`period/${PeriodMutationTypes.CHANGE_PERIOD}`, newPeriod);
  }
  async fetchPeriod() {
    await this.$store.dispatch(`period/${PeriodActionTypes.FETCH_PERIOD}`);
  }
  changeFirstDate(newDate: Date) {
    this.$store.commit(`date/${DateMutationTypes.CHANGE_FIRST_DATE}`, newDate);
  }
  changeSecondDate(newDate: Date | undefined) {
    this.$store.commit(`date/${DateMutationTypes.CHANGE_SECOND_DATE}`, newDate);
  }
  async fetchFirstDate() {
    await this.$store.dispatch(`date/${DateActionTypes.FETCH_FIRST_DATE}`);
  }
  async fetchSecondDate() {
    await this.$store.dispatch(`date/${DateActionTypes.FETCH_SECOND_DATE}`);
  }

  async onChangePeriod({
    newPeriod,
    prevPeriod,
  }: {
    newPeriod: [Date, Date];
    prevPeriod: [Date, Date];
  }) {
    try {
      this.$fullLoading.on();
      this.changePeriod(newPeriod);
      await this.fetchPeriod();
    } catch (e) {
      alert('해당 기간 데이터를 가져올 수 없습니다.');
      this.changePeriod(prevPeriod);
    }

    this.$fullLoading.off();
  }

  async onChangeFirstDate({
    newFirstDate,
    prevFirstDate,
  }: {
    newFirstDate: Date;
    prevFirstDate: Date;
  }) {
    try {
      this.$fullLoading.on();
      this.changeFirstDate(newFirstDate);
      await this.fetchFirstDate();
    } catch (e) {
      alert('해당 날짜 데이터를 가져올 수 없습니다.');
      this.changeFirstDate(prevFirstDate);
    }
    this.$fullLoading.off();
  }

  async onChangeSecondDate({
    newSecondDate,
    prevSecondDate,
  }: {
    newSecondDate: Date | undefined;
    prevSecondDate: Date | undefined;
  }) {
    try {
      this.$fullLoading.on();
      this.changeSecondDate(newSecondDate);
      await this.fetchSecondDate();
    } catch (e) {
      alert('해당 날짜 데이터를 가져올 수 없습니다.');
      this.changeSecondDate(prevSecondDate);
    }
    this.$fullLoading.off();
  }

  async mounted() {
    this.$fullLoading.on();
    if (this.type === 'period') await this.fetchPeriod();
    else if (this.type === 'date') await this.fetchFirstDate();
    this.$fullLoading.off();
  }
}
</script>

<style lang="scss" scoped></style>
