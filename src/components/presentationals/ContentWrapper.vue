<template>
  <section class="content-wrapper">
    <h2 class="content-wrapper--title">{{ title }}</h2>
    <article class="content-wrapper--content">
      <slot></slot>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/base/_colors.scss' as color;
@use '@/assets/styles/base/_fonts.scss' as font;

.content-wrapper {
  padding: 24px 0;
  &--title {
    font-size: font.$big;
    font-weight: font.$medium;
    color: color.$black-1;
  }
}
</style>
