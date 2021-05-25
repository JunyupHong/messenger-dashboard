<template>
  <div id="app">
    <Header></Header>
    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/presentationals/Header.vue';

export default {
  components: { Header },
};
</script>

<style lang="scss">
@import './assets/styles/_reset.scss';
@import './assets/styles/_mixins.scss';
@import './assets/styles/_global.scss';

#app {
  width: 100vw;
  height: 100vh;
}

.content-area {
  @include content-max-width;
  padding: 12px 0px;
  margin: auto;
}
</style>
