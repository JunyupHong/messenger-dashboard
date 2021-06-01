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
            label: 'My First dataset',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            data: [65, 59, 80, 81, 56, 55, 40],
            barThickness: 16,
          },
          {
            label: 'My second dataset',
            data: [65, 59, 80, 81, 56, 55, 40].reverse(),
            barThickness: 16,
          },
        ],
      },
    };
  },
};
</script>
