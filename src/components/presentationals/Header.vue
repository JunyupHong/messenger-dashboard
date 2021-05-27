<template>
  <header class="header">
    <div class="header--content">
      <span class="header--logo">Dashboard</span>
      <nav class="header--nav">
        <router-link class="header--nav__period" to="/">기간 별 탐색</router-link>
        |
        <router-link class="header--nav__date" to="/date">날짜 별 비교</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_colors.scss' as color;
@use '@/assets/styles/_fonts.scss' as font;
@import '@/assets/styles/_mixins.scss';

.header {
  box-shadow: 0 4px 4px color.$black-4;
  width: 100vw;

  &--content {
    width: 100%;
    @include content-max-width;
    padding: 24px 0px;
    margin: 0 auto;
  }
  &--logo {
    font-size: font.$x-big;
    font-weight: font.$bold;
    color: color.$main-1;
  }

  &--nav {
    display: inline-block;
    margin-left: 24px;
    & [aria-current] {
      color: color.$main-2;
      font-weight: font.$medium;
    }
    a:hover {
      color: color.$main-2;
      font-weight: font.$medium;
    }
  }
}
</style>
