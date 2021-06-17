import Loading from './loading.vue';

export default {
  install(Vue) {
    const LoadingConstructor = Vue.extend(Loading);
    const loadingInstance = new LoadingConstructor().$mount();

    Vue.prototype.$loading = {
      on: loadingInstance.on,
      off: loadingInstance.off,
    };

    document.body.appendChild(loadingInstance.$el);
  },
};
