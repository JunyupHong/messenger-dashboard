<template>
  <header class="header">
    <div class="header--content">
      <span class="header--logo">Dashboard</span>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';
@import '@/assets/scss/_mixins.scss';

.header {
  box-shadow: 0 4px 4px #ddd;
  display: flex;
  width: 100vw;
  justify-content: center;
  &--content {
    width: 100%;
    @include content-max-width;
    padding: 1.5rem 0px;
  }
  &--logo {
    font-size: 2.25rem;
    font-weight: 700;
    color: $main-color-1;
  }
}
</style>
