<template>
  <div id="app">
    <Header></Header>
    <main class="content-area">
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
@import './assets/styles/_global.scss';
@import './assets/styles/_reset.scss';
@import './assets/styles/_mixins.scss';

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-area {
  width: 100%;
  @include content-max-width;
  padding: 36px 0px;
}
</style>
