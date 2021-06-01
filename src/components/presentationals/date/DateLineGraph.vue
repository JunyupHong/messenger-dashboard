<template>
  <LineGraph :xLabel="xLabel" :yLabel="yLabel"></LineGraph>
</template>

<script>
import LineGraph from '@/components/presentationals/LineGraph.vue';

export default {
  props: { xLabel: String, yLabel: String },
  components: { LineGraph },
};
</script>

<style lang="scss" scoped></style>
