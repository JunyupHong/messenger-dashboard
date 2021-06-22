import type { TotalStore } from '@/store/types';
import Vue from 'vue';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $store: TotalStore;
    $vuex: TotalStore;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: TotalStore;
  }
}
