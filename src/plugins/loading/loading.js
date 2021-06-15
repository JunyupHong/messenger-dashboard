import Loading from './loading.vue';

export default {
  install(Vue) {
    const LoadingConstructor = Vue.extend(Loading);
    const loadingInstance = new LoadingConstructor({
      el: document.createElement('div'),
    });

    Vue.prototype.$loading = {
      on: loadingInstance.on,
      off: loadingInstance.off,
    };

    document.body.appendChild(loadingInstance.$el);
  },
};
