import { VueConstructor } from 'vue/types/umd';
import Loading from './loading.vue';

interface FullLoading_T {
  on: () => undefined;
  off: () => undefined;
}

declare module 'vue/types/vue' {
  interface Vue {
    $FullLoading: FullLoading_T;
  }
}

export default {
  install(Vue: VueConstructor) {
    const LoadingConstructor = Vue.extend(Loading);
    const loadingInstance = new LoadingConstructor<FullLoading_T>().$mount();

    Vue.prototype.$FullLoading = {
      on: loadingInstance.on,
      off: loadingInstance.off,
    };

    document.body.appendChild(loadingInstance.$el);
  },
};
