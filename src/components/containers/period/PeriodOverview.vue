<template>
  <PeriodOverview :data="contentData" />
</template>

<script>
import PeriodOverview from '@/components/presentationals/period/PeriodOverview.vue';
export default {
  components: {
    PeriodOverview,
  },
  data() {
    return {
      contentData: {
        day: { value: 63488, desc: '2015.02.11', prevValue: 63488 },
        week: { value: 317440, desc: '2015.02 2주차', prevValue: 400000 },
        month: { value: 1269760, desc: '2015.02', prevValue: 1000000 },
        custom: { value: 317440, desc: '설정 기간', prevValue: 400000 },
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
