<template>
  <PeriodOverview :contentData="contentData" />
</template>

<script>
import PeriodOverview from '@/components/presentationals/period/PeriodOverview.vue';
import { dateToString, getWeekNumber } from '@/utils/date.js';
import { mapGetters } from 'vuex';

export default {
  components: {
    PeriodOverview,
  },

  computed: {
    ...mapGetters('period', [
      'totalDay',
      'totalPrevDay',
      'totalWeek',
      'totalPrevWeek',
      'totalMonth',
      'totalPrevMonth',
      'totalCustom',
      'totalPrevCustom',
    ]),

    contentData() {
      return {
        day: {
          value: this.totalDay,
          desc: dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM.DD'),
          prevValue: this.totalPrevDay,
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
};
</script>

<style lang="scss" scoped></style>
