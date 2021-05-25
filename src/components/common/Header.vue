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
@import '@/assets/styles/_colors.scss';
@import '@/assets/styles/_mixins.scss';

.header {
  box-shadow: 0 4px 4px #ddd;
  display: flex;
  width: 100vw;
  justify-content: center;
  &--content {
    @include content-max-width;
    width: 100%;
    padding: 1.5rem 0px;
    display: flex;
  }
  &--logo {
    font-size: 2.25rem;
    font-weight: 700;
    color: $main-color-1;
  }

  &--nav {
    margin-left: 24px;
    a:hover {
      color: $main-color-2;
      font-weight: 600;
    }
    & [aria-current] {
      color: $main-color-2;
      font-weight: 600;
    }
  }
}
</style>
