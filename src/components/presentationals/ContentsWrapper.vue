<template>
  <section class="content-wrapper">
    <h2 class="content-wrapper--title">{{ title }}</h2>
    <article class="content-wrapper--content">
      <slot></slot>
    </article>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ContentsWrapper extends Vue {
  @Prop() title!: String;
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 32px 0;
  &--title {
    font-size: font.$big;
    font-weight: font.$medium;
    color: color.$black-1;
  }
  &--content {
    margin-top: 12px;
  }
}
</style>
