<template>
  <section class="date-picker">
    <article v-if="isPeriodPage" class="date-picker__period">period picker</article>
    <article v-else class="date-picker__date">date picker</article>
  </section>
</template>

<script>
export default {
  props: {
    type: String,
  },
  computed: {
    isPeriodPage() {
      console.log(this.type);
      return this.type === 'period';
    },
  },
};
</script>

<style lang="scss" scoped>
.date-picker {
  display: flex;
  justify-content: flex-end;
  padding: 24px 0;
}
</style>
