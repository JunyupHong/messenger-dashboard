<template>
  <section class="container">
    <h2 class="container--title">{{ title }}</h2>
    <article class="container--content">
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
@use '@/assets/styles/_colors.scss' as color;
@use '@/assets/styles/_fonts.scss' as font;

.container {
  padding: 24px 0;
  &--title {
    font-size: font.$big;
    font-weight: font.$medium;
    color: color.$black-1;
  }
}
</style>
