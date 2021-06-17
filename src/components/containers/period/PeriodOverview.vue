<template>
  <PeriodOverview :contentData="contentData" />
</template>

<script>
import PeriodOverview from '@/components/presentationals/period/PeriodOverview.vue';
import { dateToString, getWeekNumber } from '@/utils/date.js';
import { mapState } from 'vuex';

export default {
  components: {
    PeriodOverview,
  },

  data() {
    return {
      today: new Date(new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate())),
      yesterday: new Date(
        new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate() - 1)
      ),
    };
  },

  computed: {
    ...mapState('period', {
      totalCountYesterday(state) {
        return state.userCounts.get(dateToString(this.yesterday));
      },

      totalCountToday(state) {
        return state.userCounts.get(dateToString(this.today));
      },

      totalPrevWeek(state) {
        const monday = this.getMondayOfWeek(new Date(this.today).setDate(this.today.getDate() - 7));
        const endDay = new Date(
          new Date(monday).setDate(monday.getDate() + this.today.getDay() - 1)
        );

        return this.getPeriods(monday, endDay).reduce(
          (acc, cur) => acc + (state.userCounts.get(cur) || 0),
          0
        );
      },

      totalWeek(state) {
        const monday = this.getMondayOfWeek(new Date(this.today).setDate(this.today.getDate()));

        return this.getPeriods(monday, this.today).reduce(
          (acc, cur) => acc + (state.userCounts.get(cur) || 0),
          0
        );
      },

      totalPrevMonth(state) {
        const start = new Date(this.today).setMonth(this.today.getMonth() - 1, 1);
        const end = new Date(this.today).setMonth(this.today.getMonth() - 1, this.today.getDate());
        console.log(this.getPeriods(start, end));
        return this.getPeriods(start, end).reduce(
          (acc, cur) => acc + (state.userCounts.get(cur) || 0),
          0
        );
      },

      totalMonth(state) {
        const start = new Date(this.today).setDate(1);

        return this.getPeriods(start, this.today).reduce(
          (acc, cur) => acc + (state.userCounts.get(cur) || 0),
          0
        );
      },

      totalPrevCustom(state) {
        const dateLength = this.getPeriods(...state.selectedPeriod).length;
        return this.getPeriods(
          ...state.selectedPeriod.map(period => {
            return new Date(period).setDate(period.getDate() - dateLength);
          })
        ).reduce((acc, cur) => acc + (state.userCounts.get(cur) || 0), 0);
      },

      totalCustom(state) {
        return this.getPeriods(...state.selectedPeriod).reduce(
          (acc, cur) => acc + (state.userCounts.get(cur) || 0),
          0
        );
      },
    }),

    contentData() {
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
    },
  },

  methods: {
    getMondayOfWeek(date) {
      const monday = new Date(date);
      while (monday.getDay() !== 1) {
        monday.setDate(monday.getDate() - 1);
      }
      return monday;
    },

    getPeriods(startDate, endDate) {
      const period = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      while (start <= end) {
        period.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return period;
    },

    prevCustomPeriods(selectedPeriod) {
      const periods = [];
      const end = selectedPeriod[0];
      let start = new Date(new Date(end).setDate(end.getDate() - this.customPeriods.length));
      while (start < end) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return periods;
    },

    customPeriods(selectedPeriod) {
      const periods = [];
      let start = new Date(selectedPeriod[0]);
      while (start <= selectedPeriod[1]) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return periods;
    },
  },
};
</script>

<style lang="scss" scoped></style>
