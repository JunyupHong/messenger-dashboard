<template>
  <div class="loading" v-if="isLoading" v-loading="isLoading"></div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    on() {
      this.isLoading = true;
    },
    off() {
      this.isLoading = false;
    },
  },
};
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
