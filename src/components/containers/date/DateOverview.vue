<template>
  <DateOverview :firstDate="firstDate" :secondDate="secondDate" />
</template>

<script>
import DateOverview from '@/components/presentationals/date/DateOverview.vue';
export default {
  data() {
    return {
      firstDate: {
        desc: '2021.05.16',
        max: 63488,
        total: 123456,
        servers: [{ name: '사내 (54)', value: 6431 }],
      },
      secondDate: {
        desc: '2021.05.18',
        max: 11111,
        total: 654321,
        servers: [{ name: '사내 (54)', value: 6431 }],
      },
    };
  },
  components: { DateOverview },
};
</script>
