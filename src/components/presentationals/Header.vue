<template>
  <header class="header">
    <div class="header__content">
      <span class="header__logo">Dashboard</span>
      <nav class="header__nav">
        <router-link class="header__nav--period" to="/">기간 별 탐색</router-link>
        |
        <router-link class="header__nav--date" to="/date">날짜 별 비교</router-link>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/mixins/_mixins.scss';

.header {
  box-shadow: 0 4px 4px color.$black-4;
  width: 100vw;

  &__content {
    width: 100%;
    @include content-max-width;
    padding: 24px 0;
    margin: 0 auto;
  }
  &__logo {
    font-size: font.$x-big;
    font-weight: font.$bold;
    color: color.$main-1;
  }

  &__nav {
    display: inline-block;
    margin-left: 24px;
    & [aria-current='page'] {
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
