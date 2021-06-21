import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import date from './date/index';
import period from './period/';

console.log(date);
Vue.use(Vuex);

export interface RootState {
  //
}

const store: StoreOptions<RootState> = {
  modules: {
    date,
    period,
  },
};

export default new Vuex.Store<RootState>(store);
