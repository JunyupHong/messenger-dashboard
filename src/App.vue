<template>
  <div id="app">
    <Header></Header>
    <main class="content-area">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/presentationals/Header.vue';
import Component from 'vue-class-component';

@Component({
  components: { Header },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins/_mixins.scss';

#app {
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', arial, sans-serif;
  width: 100vw;
  height: 100vh;
}

.content-area {
  @include content-max-width;
  padding: 12px 0;
  margin: auto;
}
</style>
