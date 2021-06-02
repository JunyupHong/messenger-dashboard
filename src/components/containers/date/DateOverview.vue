<template>
  <DateOverview :firstDate="firstDate" :secondDate="secondDate" :barGraph="barGraph" />
</template>

<script>
import DateOverview from '@/components/presentationals/date/DateOverview.vue';

export default {
  components: { DateOverview },
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
      barGraph: {
        labels: [
          '사내 (54)',
          '일반 (93)',
          '단독 (242)',
          '전용 (198)',
          '전옹 (88)',
          '전용 (97)',
          'KBS (182)',
        ],
        datasets: [
          {
            label: '2021.05.16',
            backgroundColor: '#2E447F',
            data: Array.from({ length: 7 }).map(() => Math.round(Math.random() * 100)),
            barThickness: 16,
          },
          {
            label: '2021.05.18',
            data: Array.from({ length: 7 }).map(() => Math.round(Math.random() * 100)),
            backgroundColor: '#CF4F2E',
            barThickness: 16,
          },
        ],
      },
    };
  },
};
</script>
