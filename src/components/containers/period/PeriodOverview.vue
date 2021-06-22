<template>
  <PeriodOverview :contentData="contentData" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import PeriodOverview from '@/components/presentationals/period/PeriodOverview.vue';
import { dateToString, getWeekNumber } from '@/utils/date';

@Component({
  components: { PeriodOverview },
})
export default class PeriodOverviewContainer extends Vue {
  private today = new Date(
    new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate())
  );
  private yesterday = new Date(
    new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate() - 1)
  );

  get totalCountYesterday() {
    return this.$store.state.period.userCounts.get(dateToString(this.yesterday));
  }
  get totalCountToday() {
    return this.$store.state.period.userCounts.get(dateToString(this.today));
  }

  get totalPrevWeek() {
    const monday = this.getMondayOfWeek(new Date(this.today).setDate(this.today.getDate() - 7));
    const endDay = new Date(new Date(monday).setDate(monday.getDate() + this.today.getDay() - 1));

    return this.getPeriods(monday, endDay).reduce(
      (acc, cur) => acc + (this.$store.state.period.userCounts.get(cur) || 0),
      0
    );
  }
  get totalWeek() {
    const monday = this.getMondayOfWeek(new Date(this.today).setDate(this.today.getDate()));

    return this.getPeriods(monday, this.today).reduce(
      (acc, cur) => acc + (this.$store.state.period.userCounts.get(cur) || 0),
      0
    );
  }

  get totalPrevMonth() {
    const start = new Date(this.today).setMonth(this.today.getMonth() - 1, 1);
    const end = new Date(this.today).setMonth(this.today.getMonth() - 1, this.today.getDate());
    return this.getPeriods(start, end).reduce(
      (acc, cur) => acc + (this.$store.state.period.userCounts.get(cur) || 0),
      0
    );
  }
  get totalMonth() {
    const start = new Date(this.today).setDate(1);

    return this.getPeriods(start, this.today).reduce(
      (acc, cur) => acc + (this.$store.state.period.userCounts.get(cur) || 0),
      0
    );
  }

  get totalPrevCustom() {
    const dateLength = this.getPeriods(...this.$store.state.period.selectedPeriod).length;

    return this.getPeriods(
      ...(this.$store.state.period.selectedPeriod.map(period =>
        new Date(period).setDate(period.getDate() - dateLength)
      ) as [number, number])
    ).reduce((acc, cur) => acc + (this.$store.state.period.userCounts.get(cur) || 0), 0);
  }
  get totalCustom() {
    return this.getPeriods(...this.$store.state.period.selectedPeriod).reduce(
      (acc, cur) => acc + (this.$store.state.period.userCounts.get(cur) || 0),
      0
    );
  }

  get contentData() {
    return {
      day: {
        value: this.totalCountToday,
        desc: dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM.DD'),
        prevValue: this.totalCountYesterday,
      },
      week: {
        value: this.totalWeek,
        desc: `${dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM')}
                 ${getWeekNumber(new Date(new Date().setFullYear(2020)))}주차`,
        prevValue: this.totalPrevWeek,
      },
      month: {
        value: this.totalMonth,
        desc: dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM'),
        prevValue: this.totalPrevMonth,
      },
      custom: {
        value: this.totalCustom,
        desc: '설정 기간',
        prevValue: this.totalPrevCustom,
      },
    };
  }

  getMondayOfWeek(date: Date | number) {
    const monday = new Date(date);
    while (monday.getDay() !== 1) {
      monday.setDate(monday.getDate() - 1);
    }
    return monday;
  }

  getPeriods(startDate: Date | number, endDate: Date | number) {
    const period = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    while (start <= end) {
      period.push(dateToString(start));
      start.setDate(start.getDate() + 1);
    }
    return period;
  }

  prevCustomPeriods(selectedPeriod: [Date, Date]) {
    const periods = [];
    const end = selectedPeriod[0];
    let start = new Date(new Date(end).setDate(end.getDate() - this.customPeriods.length));
    while (start < end) {
      periods.push(dateToString(start));
      start.setDate(start.getDate() + 1);
    }
    return periods;
  }

  customPeriods(selectedPeriod: [Date, Date]) {
    const periods = [];
    let start = new Date(selectedPeriod[0]);
    while (start <= selectedPeriod[1]) {
      periods.push(dateToString(start));
      start.setDate(start.getDate() + 1);
    }
    return periods;
  }
}
</script>

<style lang="scss" scoped></style>
