<template>
  <section class="linegraph">
    <div v-if="yLabel" class="linegraph__label linegraph__y-label">{{ yLabel }}</div>
    <div class="linegraph__right">
      <ContentBox>
        <slot></slot>
      </ContentBox>
      <div v-if="xLabel" class="linegraph__label linegraph__x-label">{{ xLabel }}</div>
    </div>
  </section>
</template>

<script>
import ContentBox from '@/components/presentationals/ContentBox.vue';

export default {
  props: {
    yLabel: String,
    xLabel: String,
  },
  components: { ContentBox },
};
</script>
<style lang="scss" scoped>
.linegraph {
  display: flex;
  min-width: 1000px;
  &__right {
    flex: 1;
  }
  &__label {
    font-size: font.$small;
    font-weight: font.$bold;
    color: color.$black-3;
  }
  &__y-label {
    writing-mode: vertical-lr;
    text-orientation: sideways;
    text-align: center;
    transform: rotate(180deg);
    margin-right: 8px;
  }
  &__x-label {
    text-align: center;
    margin-top: 8px;
  }
}
</style>
