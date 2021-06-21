<template>
  <div class="loading" v-if="isLoading" v-loading="isLoading"></div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Loading extends Vue {
  isLoading = false;

  on() {
    this.isLoading = true;
  }

  off() {
    this.isLoading = false;
  }
}
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
