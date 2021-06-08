<template>
  <PeriodOverview :contentData="contentData" />
</template>

<script>
import PeriodOverview from '@/components/presentationals/period/PeriodOverview.vue';
import { dateToString, getWeekNumber } from '@/utils/date.js';

export default {
  components: {
    PeriodOverview,
  },
  computed: {
    contentData() {
      return {
        day: {
          value: this.$store.getters.totalDay,
          desc: dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM.DD'),
          prevValue: this.$store.getters.totalPrevDay,
        },
        week: {
          value: this.$store.getters.totalWeek,
          desc: `${dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM')}
                 ${getWeekNumber(new Date(new Date().setFullYear(2020)))}주차`,
          prevValue: this.$store.getters.totalPrevWeek,
        },
        month: {
          value: this.$store.getters.totalMonth,
          desc: dateToString(new Date(new Date().setFullYear(2020)), 'YYYY.MM'),
          prevValue: this.$store.getters.totalPrevMonth,
        },
        custom: {
          value: this.$store.getters.totalCustom,
          desc: '설정 기간',
          prevValue: this.$store.getters.totalPrevCustom,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
