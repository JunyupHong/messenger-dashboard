<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/common/Header.vue';

export default {
  components: { Header },
};
</script>

<style lang="scss">
@import './assets/scss/_global.scss';
@import './assets/scss/_reset.scss';
</style>
