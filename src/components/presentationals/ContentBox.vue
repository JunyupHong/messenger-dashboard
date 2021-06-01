<template>
  <article class="content-box">
    <h3 class="content-box__title">
      <slot name="title"></slot>
    </h3>
    <div class="content-box__content">
      <slot></slot>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/_colors.scss' as color;
@use '@/assets/styles/base/_fonts.scss' as font;

.content-box {
  border: solid 1px color.$black-3;
  box-shadow: 2px 2px 4px color.$black-3;
  padding: 1.5rem 1rem;
  position: relative;
  &__title {
    font-size: 1.5rem;
    font-weight: font.$bold;
    color: color.$black-2;
    text-transform: capitalize;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
