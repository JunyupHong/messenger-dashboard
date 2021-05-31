<template>
  <div id="app">
    <Header></Header>
    <main class="content-area">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/presentationals/Header.vue';

export default {
  components: { Header },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins/_mixins.scss';

#app {
  width: 100vw;
  height: 100vh;
}

.content-area {
  @include content-max-width;
  padding: 12px 0;
  margin: auto;
}
</style>
