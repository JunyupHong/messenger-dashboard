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

<script lang="ts">
import Vue from 'vue';
import ContentBox from '@/components/presentationals/ContentBox.vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: { ContentBox },
})
export default class LineGraph extends Vue {
  @Prop() private yLabel?: string;
  @Prop() private xLabel?: string;
}
</script>

<style lang="scss" scoped>
.linegraph {
  position: relative;
  display: flex;
  min-width: 1000px;

  &__right {
    flex: 1;
  }

  &__label {
    font-size: font.$small;
    font-weight: font.$bold;
    color: color.$black-2;
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
