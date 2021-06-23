import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import date from './date/';
import period from './period/';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    date,
    period,
  },
};

export default new Vuex.Store(store);
